import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MissionService {
    constructor( private readonly prismaService:PrismaService, @InjectQueue('mission') private readonly mission:Queue) {}

    
    async getMissions(plantUserId: number) {
        const date = new Date();
        return await this.prismaService.plantUserMission.findMany({
            where: {
                AND:[
                    {plantUserId: plantUserId},
                    {status: 'pending'},
                ]
            },
            include: {
                Mission: true
            }
        });
    }

}
 