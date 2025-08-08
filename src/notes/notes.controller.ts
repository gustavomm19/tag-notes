import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { AuthGuard } from 'src/auth/guard';

@Controller('notes')
@UseGuards(AuthGuard)
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

  @Patch(':id')
  updateNote(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.updateNote(noteId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteNote(@Param('id', ParseIntPipe) noteId: number) {
    return this.notesService.deleteNote(noteId);
  }
}
