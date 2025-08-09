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
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { GetNoteDto } from './dto/get-note.dto';
import { AuthGuard } from 'src/auth/guard';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';

@Controller('notes')
@UseGuards(AuthGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}
  @Get()
  @ApiOperation({ summary: 'Return the list of Notes' })
  @ApiOkResponse({
    description: 'List of Notes fetched successfully',
    type: GetNoteDto,
    isArray: true,
  })
  getNotes(@Query('tag') tag: string) {
    return this.notesService.getNotes(tag);
  }

  @Post()
  @ApiOperation({ summary: 'Creates a new Note' })
  @ApiCreatedResponse({
    description: 'Note created successfully.',
    type: GetNoteDto,
    isArray: false,
  })
  @ApiBadRequestResponse({ description: 'Invalid data provided.' })
  createNote(@Body() dto: CreateNoteDto) {
    return this.notesService.createNote(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates an existent Note' })
  @ApiOkResponse({
    description: 'Note updated successfully.',
    type: GetNoteDto,
    isArray: false,
  })
  @ApiNotFoundResponse({ description: 'Note not found' })
  updateNote(
    @Param('id', ParseIntPipe) noteId: number,
    @Body() dto: UpdateNoteDto,
  ) {
    return this.notesService.updateNote(noteId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a Note' })
  @ApiNoContentResponse({ description: 'Note deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  deleteNote(@Param('id', ParseIntPipe) noteId: number) {
    return this.notesService.deleteNote(noteId);
  }

  @Post('/faker')
  @ApiOperation({ summary: 'Fill database with random notes' })
  @ApiOkResponse({
    description: 'Notes generated successfully.',
    type: GetNoteDto,
    isArray: true,
  })
  createRandomNotes() {
    return this.notesService.createRandomNotes();
  }
}
