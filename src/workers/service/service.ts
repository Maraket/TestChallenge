import { Injectable, NotFoundException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { AxiosInstance, AxiosResponse } from 'axios';
import Axios from 'axios';
import { from, of, Observable, forkJoin, throwError } from 'rxjs';
import { flatMap, catchError } from 'rxjs/operators';
import { Job } from './job';
import { Worker } from './worker';
import * as geoLib from 'geolib';
import * as _ from 'lodash';

@Injectable()
export class Service {
    private axios: AxiosInstance;
    constructor(){
        this.axios = Axios.create({
            baseURL: process.env.BASE_URL,
          });
    }

    private getJobs(): Observable<Job[]>{
        return from(this.axios.get<Job[]>(process.env.JOBS)).pipe(
            flatMap((jobsResponse: AxiosResponse<Job[]>) => {
                if (jobsResponse.status !== 200)
                    throw new InternalServerErrorException('There was an issue retrieving job listings');
                return of(jobsResponse.data);
            }),
        );
    }

    private getWorker(id: number): Observable<Worker> {
        if (id !== 0 && (isNaN(id) || !id)){
            return new Observable(() => {throw new NotFoundException('User Record not found'); });
        }
        return from(this.axios.get<Worker[]>(process.env.WORKERS)).pipe(
            flatMap((workersResponse: AxiosResponse<Worker[]>) => {
                if (workersResponse.status !== 200)
                    throw new InternalServerErrorException('There was an issue retrieving worker list');
                for (const worker of workersResponse.data)
                    if (worker.userId === id)
                        return of(worker);
                throw new NotFoundException('User Record not found');
            }),
        );
    }

    public getWorkerJobs(id: number): Observable<Job[]>{
        const jobs = this.getJobs();
        const worker = this.getWorker(id);

        return forkJoin(jobs, worker).pipe(
            flatMap((col: [Job[], Worker]) => {
                return of(this.getSuitableJobs(col[0], col[1]));
            }),
            catchError((err: Error) => {
                if (err instanceof HttpException)
                    throw err;
                throw new InternalServerErrorException('Uh oh, something unexpected happened');
            }),
        );
    }

    private getSuitableJobs(jobs, worker): Job[]{
        // If a worker isn't active, then no job is suitable for them
        if (!worker.isActive)
            return [];

        const suitableJobs: {job: Job, suitability: number}[] = [];

        for (const job of jobs){
            const score: number = this.suitability(job, worker);
            if (score > 0)
                suitableJobs.push({job, suitability: score});
        }

        // Sort, map, the just return the top 3
        return _.chain(suitableJobs).sortBy('suitability', 'desc').map('job').value().slice(0, 3);
    }

    /*
    Generates score of how suitable the job is to the person, any value above 0 is considered suitable
    */
    private suitability(job: Job, worker: Worker): number {
        let score = 1;

        // If not active, not suitable
        if (!worker.isActive)
            return -1;

        // If they need a drivers licence but don't have one, not suitable
        if (job.driverLicenseRequired && !worker.hasDriversLicense)
            return -1;

        let accuracy = 1000;

        // Just incase, all the data is set to km but incase
        switch (worker.jobSearchAddress.unit){
            case 'm':
                accuracy = 1;
                break;
            default:
                accuracy = 1000;
        }

        // Calculates distance in meters
        const distance = geoLib.getDistance(
            worker.jobSearchAddress,
            job.location,
            accuracy,
            1,
        );

        const distanceNormalized = Math.floor(distance / accuracy);

        // Don't have to worry about floating point comparison since it's all integers at this point
        // Also if it's outside the search radius of the worker
        if (distanceNormalized > (worker.jobSearchAddress.maxJobDistance))
            return -1;

        score += distanceNormalized;
        // Check the worker has all required certificates
        for (const cert of job.requiredCertificates){
            if (worker.certificates.indexOf(cert) === -1)
                return -1;
        }

        // If the workers skill is the job title, we assume they know that (skills seems more worded like past employment history)
        for (const skill of worker.skills){
            if (skill === job.jobTitle){
                score += 1;
            }
        }

        const billRate: number = Number(job.billRate ? job.billRate.replace(/[^0-9.]/g, '') : 0);
        const rating: number = worker.rating;

        // Need to confirm rating impace i.e: higher number is good or bad

        // Probably a more scientific way to match these up
        // Rating number higher is good
        score -= Math.floor(billRate / rating);

        /*
            // Rating number higher is bad
            score += billRate / rating;
        */

        return score;
    }
}
