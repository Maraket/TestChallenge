import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Service } from './service/service';
import { Job } from './service/job';

@Controller()
export class WorkersController {

    constructor(private readonly service: Service){
    }

    @Get(':id')
    findJobs(@Param('id') id: string): Observable<Job[]>{
        return this.service.getWorkerJobs(Number(id));
    }
}
