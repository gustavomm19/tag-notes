import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  getNotes() {
    return this.notesService.getNotes();
  }

  @Post()
  createNote(@Body() dto: CreateNoteDto) {
    return this.notesService.createNote(dto);
  }

  @Put(':id')
  updateNote(@Param('id', ParseIntPipe) noteId: number) {
    return this.notesService.updateNote(noteId);
  }

  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) noteId: number) {
    return this.notesService.deleteNote(noteId);
  }
}
