import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { AuthGuard } from 'src/auth/guard';
import { CreateTagDto } from './dto/create-tag.dto';

@UseGuards(AuthGuard)
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  getTags() {
    return this.tagsService.getTags();
  }

  @Post()
  createTag(@Body() dto: CreateTagDto) {
    return this.tagsService.createTag(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) tagId: number) {
    return this.tagsService.deleteTag(tagId);
  }
}
