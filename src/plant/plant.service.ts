import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlantDto } from './dto/create-plant.dto';
import { UpdatePlantDto } from './dto/update-plant.dto';
import { PrismaService } from 'src/prisma.service';
import { MissionStatus, Prisma } from '@prisma/client';
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
  
      // Crear las relaciones PlantUser y obtener sus IDs
      const plantUsers = await Promise.all(userPlantDto.map(async plant => {
        return await this.prismaService.plantUser.create({
          data: {
            userId,
            plantId: plant.plantId,
            name: plant.name,
          },
        });
      }));
  
      // Obtener todas las misiones relacionadas con las plantas del usuario
      const missions = await this.prismaService.mission.findMany({
        where: { plant_id: { in: userPlantDto.map(plant => plant.plantId) } },
      });
  
      // Crear las misiones para cada planta del usuario
      const plantUserMissions = plantUsers.map(plantUser => {
        const plantMissions = missions.filter(mission => mission.plant_id === plantUser.plantId); // Filtrar por plant_id
        return plantMissions.map(mission => ({
          plantUserId: plantUser.id,  // Usar el ID de PlantUser
          missionId: mission.id,
          status: MissionStatus.pending, // Assuming 'PENDING' is a valid value of the enum MissionStatus
          unlockedAt: null,
          progress: 0,
          completedAt: null,
        }));
      });
  
      // Crear las misiones para PlantUser
      await this.prismaService.plantUserMission.createMany({
        data: plantUserMissions.flat(),
      });
  
      return { message: 'Plants added successfully' };
        
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Plant not found', 404);
        }
      } else if (error instanceof HttpException) {
        throw error;
      }
      console.error(error);
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

  async getUserPlant(userId: number, plantId: number) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const userPlant = await this.prismaService.plantUser.findFirst({
        where: { userId, plantId },
        include: { 
          Plant: true,
          states: true,
          missions: true
        },
      });

      if (!userPlant) {
        throw new HttpException('Plant not found', 404);
      }

      return userPlant;

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
