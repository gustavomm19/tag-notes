import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  getNotes() {
    return this.prisma.notes.findMany({
      orderBy: {
        createdAt: 'desc',
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
}
