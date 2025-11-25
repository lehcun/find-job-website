import { Controller, Get, Param } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  async findOne(@Param() id: string) {
    return await this.jobService.findOne(id);
  }

  @Get()
  async getAll() {
    return await this.jobService.findAll();
  }
}