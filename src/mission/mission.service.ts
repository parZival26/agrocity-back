import { InjectQueue } from '@nestjs/bull';
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Queue } from 'bull';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MissionService {
    constructor( private readonly prismaService:PrismaService, @InjectQueue('mission') private readonly mission:Queue) {}

    async getMission(missionId: number) {
        return await this.prismaService.mission.findUnique({
            where: {id: missionId},
        });
    }

    
    async getMissionsUserPlant(plantUserId: number) {
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

    async completeMission(plantUserMissionId: number) {
        try{
            const plantUserMission = await this.prismaService.plantUserMission.findUnique({
                where: {id: plantUserMissionId},
            });

            if(!plantUserMission){
                throw new HttpException('Plant User Mission not found', 404);
            }

            await this.prismaService.plantUserMission.update({
                where: {id: plantUserMissionId},
                data: {
                    status: 'completed',
                    completedAt: new Date(),
                }
            });

            return plantUserMission;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            } else if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new HttpException('Plant User Mission not found', 404);
                }
            }

            throw new HttpException('Internal server error', 500);
        }
    }

}
 