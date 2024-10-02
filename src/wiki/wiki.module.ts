import { Module } from '@nestjs/common';
import { WikiService } from './wiki.service';
import { WikiController } from './wiki.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [WikiController],
  providers: [WikiService, PrismaService],
})
export class WikiModule {}
