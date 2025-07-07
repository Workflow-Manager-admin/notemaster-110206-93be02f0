import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PUBLIC_INTERFACE
@Component({
  selector: 'note-list-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './note-list-sidebar.component.html',
  styleUrl: './note-list-sidebar.component.css'
})
export class NoteListSidebarComponent {
  @Input() notes: Note[] = [];
  @Input() activeNoteId: string | null = null;
  @Output() selectNote = new EventEmitter<string>();
  @Output() createNote = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  searchQuery = '';

  onSelectNote(id: string) {
    this.selectNote.emit(id);
  }
  onCreateNote() {
    this.createNote.emit();
  }
  onSearchChange(q: string) {
    this.search.emit(q);
  }

  // Angular trackBy function for ngFor
  trackByNoteId(index: number, note: Note) {
    return note.id;
  }
}
