import { Controller, Get, HttpException, Param, Patch, UseGuards } from '@nestjs/common';
import { MissionService } from './mission.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('mission')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}
  

  @Get('userPlant/:id')
  @UseGuards(JwtAuthGuard)
  async getMissionsUserPlant(@Param('id') plantUserId: string) {
    if (!plantUserId) {
      throw new  HttpException('Plant User ID is required', 400);
    }
    return this.missionService.getMissionsUserPlant(+plantUserId);
  }

  @Patch('completeMission/:id')
  @UseGuards(JwtAuthGuard)
  async completeMission(@Param('id') plantUserMissionId: string) {
    if (!plantUserMissionId) {
      throw new  HttpException('Plant User Mission ID is required', 400);
    }
    return this.missionService.completeMission(+plantUserMissionId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getMission(@Param('id') missionId: string) {
    if (!missionId) {
      throw new  HttpException('Mission ID is required', 400);
    }
    return this.missionService.getMission(+missionId);
  }



}
