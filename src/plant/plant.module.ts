import { Module } from '@nestjs/common';
import { PlantService } from './plant.service';
import { PlantController } from './plant.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PlantController],
  providers: [PlantService, PrismaService],
})
export class PlantModule {}
