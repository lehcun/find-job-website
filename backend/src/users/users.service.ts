import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  async findOne(userId: string) {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }
}
