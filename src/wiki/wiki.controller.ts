import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WikiService } from './wiki.service';
import { CreateWikiDto } from './dto/create-wiki.dto';
import { UpdateWikiDto } from './dto/update-wiki.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('wiki')
export class WikiController {
  constructor(private readonly wikiService: WikiService) {}

  // @Post()
  // create(@Body() createWikiDto: CreateWikiDto) {
  //   return this.wikiService.create(createWikiDto);
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.wikiService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.wikiService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWikiDto: UpdateWikiDto) {
  //   return this.wikiService.update(+id, updateWikiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.wikiService.remove(+id);
  // }
}
