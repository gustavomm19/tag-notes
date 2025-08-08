import { Injectable, NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  getNotes(tags?: string[]) {
    return this.prisma.notes.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        ...(tags && tags.length > 0
          ? {
              tags: {
                some: {
                  name: {
                    in: tags,
                  },
                },
              },
            }
          : {}),
      },
      include: { tags: true },
    });
  }

  async createNote(dto: CreateNoteDto) {
    const { tags, ...data } = dto;
    const note = await this.prisma.notes.create({
      data: {
        ...data,
        tags: tags?.length
          ? {
              connectOrCreate: tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            }
          : undefined,
      },
      include: { tags: true },
    });
    return note;
  }

  async updateNote(noteId: number, dto: UpdateNoteDto) {
    const { tags, ...data } = dto;
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
        tags: tags?.length
          ? {
              connectOrCreate: tags.map((tag) => ({
                where: { name: tag },
                create: { name: tag },
              })),
            }
          : undefined,
      },
      include: { tags: true },
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
    const tags = faker.helpers.multiple(() => faker.lorem.word(), {
      count: 5,
    });

    function createRandomNote() {
      return {
        title: faker.lorem.words({ min: 1, max: 3 }),
        description: faker.lorem.words({ min: 5, max: 25 }),
        // tags: {
        //   connectOrCreate: tags
        //     .slice(0, Math.floor(Math.random() * 5 + 1))
        //     .map((tag) => ({
        //       where: { name: tag },
        //       create: { name: tag },
        //     })),
        // },
      };
    }

    const notes = faker.helpers.multiple(createRandomNote, {
      count: 1,
    });

    const results = await this.prisma.notes.createMany({
      data: notes,
    });
    return results;
  }
}
