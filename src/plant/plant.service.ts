import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UserPlantDto } from './dto/user-plant.dto';

@Injectable()
export class PlantService {
  constructor(private readonly prismaService: PrismaService) {}


  async addUserPlants(userId: number, userPlantDto: UserPlantDto[]) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const plants = await this.prismaService.plant.findMany({
        where: { id: { in: userPlantDto.map(plant => plant.plantId) } },
      });

      if (plants.length !== userPlantDto.length) {
        throw new HttpException('Plant not found', 404);
      }

      const plantUsers = userPlantDto.map(plant => {
        return {
          userId,
          plantId: plant.plantId,
          name: plant.name,
        };
      });

      await this.prismaService.plantUser.createMany({
        data: plantUsers,
      });


      return { 'message': 'Plants added successfully' };
        
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Plant not found', 404);
        }
      } else if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Internal server error', 500);
    }
  } 

  async getUserPlants(userId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const userPlants = await this.prismaService.plantUser.findMany({
        where: { userId },
        include: { 
          Plant: true,
          states: true,
          missions: true
        },
      });

      return userPlants;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Plant not found', 404);
        }
      }
      throw new HttpException('Internal server error', 500);
    }
  }

}
