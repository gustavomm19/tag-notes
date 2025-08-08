import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTags() {
    return await this.prisma.tags.findMany();
  }

  async createTag(dto: CreateTagDto) {
    const tagExists = await this.prisma.tags.findUnique({
      where: {
        name: dto.name,
      },
    });

    if (tagExists) {
      throw new BadRequestException('This tag already exists');
    }

    return await this.prisma.tags.create({
      data: dto,
    });
  }

  async deleteTag(tagId: number) {
    const tag = await this.prisma.tags.findUnique({
      where: {
        id: tagId,
      },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    await this.prisma.tags.delete({
      where: {
        id: tagId,
      },
    });
  }
}
