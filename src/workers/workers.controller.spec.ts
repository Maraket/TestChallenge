import { Test, TestingModule } from '@nestjs/testing';
import { WorkersController } from './workers.controller';
import { Service } from './service/service';
import { NotFoundException } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config();

// Should be a mock service for testing purposes

describe('WorkersController', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [WorkersController],
      providers: [Service],
    }).compile();
  });

  it('should be defined', () => {
    const controller: WorkersController = module.get<WorkersController>(WorkersController);
    expect(controller).toBeDefined();
  });

  it('should throw an exception when a bad non alphanumeric value is passed', (done) => {
    const controller: WorkersController = module.get<WorkersController>(WorkersController);

    controller.findJobs('abc123').subscribe(() => done.fail(), (e) => {
      expect(e).toBeInstanceOf(NotFoundException);
      done();
    });
  });
});
