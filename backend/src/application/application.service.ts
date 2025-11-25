import { Injectable } from '@nestjs/common';

@Injectable()
export class ApplicationService {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll() {
    return await this.prisma.application.findMany({});
  }
}