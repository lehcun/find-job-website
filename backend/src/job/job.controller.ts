import { Controller, Get } from '@nestjs/common';
import { JobService } from './job.service';

@Controller('job')
export class JobController {
  constructor(private jobService: JobService) {}

  @Get()
  async getAll() {
    return await this.jobService.findAll();
  }
}
