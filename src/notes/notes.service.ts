import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async getNotes(tag: string) {
    const notes = await this.prisma.notes.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: tag
        ? {
            tags: {
              contains: tag.toLowerCase(),
            },
          }
        : {},
    });

    return notes;
  }

  async createNote(dto: CreateNoteDto) {
    const { tags, ...data } = dto;
    const joinedTags = tags?.join(',').toUpperCase() || '';
    const note = await this.prisma.notes.create({
      data: {
        ...data,
        tags: joinedTags,
      },
    });
    return note;
  }

  async updateNote(noteId: number, dto: UpdateNoteDto) {
    const { tags, ...data } = dto;
    const joinedTags = tags?.join(',').toUpperCase() || '';
    const note = await this.prisma.notes.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    const updatedNote = await this.prisma.notes.update({
      where: {
        id: noteId,
      },
      data: {
        ...data,
        tags: joinedTags,
      },
    });

    return updatedNote;
  }

  async deleteNote(noteId: number) {
    const note = await this.prisma.notes.findUnique({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    await this.prisma.notes.delete({
      where: {
        id: noteId,
      },
    });
  }

  async createRandomNotes() {
    const limit = 20;

    const tags = faker.helpers.multiple(() => faker.lorem.word(), {
      count: 5,
    });

    function createRandomNote() {
      return {
        title: faker.lorem.words({ min: 1, max: 3 }),
        description: faker.lorem.words({ min: 5, max: 25 }),
        tags: tags.slice(0, Math.floor(Math.random() * 5 + 1)).join(','),
      };
    }

    const notes = faker.helpers.multiple(createRandomNote, {
      count: limit,
    });

    await this.prisma.notes.createMany({
      data: notes,
    });

    const result = await this.prisma.notes.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
    return result;
  }
}
