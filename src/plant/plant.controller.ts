import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { PlantService } from './plant.service';
import { UserPlantDto } from './dto/user-plant.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { UserPlantArrayDto } from './dto/user-plant-array.dto';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post('userPlant/')
  @UseGuards(JwtAuthGuard)
  create(@Body(new ValidationPipe()) userPlantDto: UserPlantArrayDto, @Req() req: Request) {    
    const userId = req.user['id'];
    return this.plantService.addUserPlants(userId, userPlantDto.userPlants);
  }

  @Get('userPlant/')
  @UseGuards(JwtAuthGuard)
  findAll(@Req() req: Request) {
    const userId = req.user['id'];
    return this.plantService.getUserPlants(userId);
  }

  @Get('userPlant/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user['id'];
    return this.plantService.getUserPlant(userId, +id);
  }

  
}
