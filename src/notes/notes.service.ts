import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  fakeNotes = [{ title: 'My note', description: 'asdasdasd' }];

  getNotes() {
    return this.fakeNotes;
  }

  createNote(dto: CreateNoteDto) {
    return dto;
  }

  updateNote(noteId: number) {
    return this.fakeNotes;
  }

  deleteNote(noteId: number) {
    return this.fakeNotes;
  }
}
