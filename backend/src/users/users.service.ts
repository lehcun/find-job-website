import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: string) {
    return await this.prisma.user.findUnique({ where: { id: userId } });
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }
}
