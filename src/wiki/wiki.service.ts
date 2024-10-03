import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWikiDto } from './dto/create-wiki.dto';
import { UpdateWikiDto } from './dto/update-wiki.dto';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class WikiService {

  constructor (private readonly prismaService: PrismaService) {}

  // create(createWikiDto: CreateWikiDto) {
  //   return 'This action adds a new wiki';
  // }

  async findAll() {
    try {
      return await this.prismaService.plant.findMany(
        {
          select: {
            id: true,
            commonName: true,
            scientificName: true,
            family: true,
            imageURL: true,
          }
        }
      );
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
          default:
            console.log(error);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } else if (error instanceof HttpException) {
        throw error;
      } else {
        console.error('Error: ', error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOne(id: number) {
    try {
      const plant = await this.prismaService.plant.findUnique({
        where: {
          id: id
        }
      });

      if (!plant) {
        throw new HttpException('Plant not found', HttpStatus.NOT_FOUND);
      }

      return plant;

    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            throw new HttpException('Conflict', HttpStatus.CONFLICT);
          default:
            console.log(error);
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      } else if (error instanceof HttpException) {
        throw error;
      } else {
        console.error('Error: ', error);
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  // update(id: number, updateWikiDto: UpdateWikiDto) {
  //   return `This action updates a #${id} wiki`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} wiki`;
  // }
}
