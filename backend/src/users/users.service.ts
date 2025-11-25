import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor (private readonly prisma : PrismaClient) {}

    async findOne(userId: string){
        return await this.prisma.user.findOne({where: {id: userId}});
    }

    async findAll(){
        return await this.prisma.user.findMany({});
    }
}
