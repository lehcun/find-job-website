import { Controller } from '@nestjs/common';

@Controller('application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  async getAll() {
    return this.applicationService.findAll();
  }
}
