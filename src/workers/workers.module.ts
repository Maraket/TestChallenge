import { Module } from '@nestjs/common';
import { Service } from './service/service';
import { WorkersController } from './workers.controller';

@Module({
    controllers: [WorkersController],
    providers: [Service],
})
export class WorkersModule {}
