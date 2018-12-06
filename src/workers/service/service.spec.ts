import { Test, TestingModule } from '@nestjs/testing';
import { Service } from './service';

import * as dotenv from 'dotenv';
import { NotFoundException } from '@nestjs/common';
dotenv.config();

describe('ServiceService', () => {
  let service: Service;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Service],
    }).compile();
    service = module.get<Service>(Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw an exception', (done) => {
      service.getWorkerJobs(-1).subscribe(() => done.fail(), e => {
        expect(e).toBeInstanceOf(NotFoundException);
        done();
      });
  });
});
