import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mission',
    })
  ],
  controllers: [MissionController],
  providers: [MissionService, PrismaService],
})
export class MissionModule {}
