import { Component } from '@angular/core';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { NoteListSidebarComponent } from '../../components/note-list-sidebar/note-list-sidebar.component';
import { NoteEditorComponent } from '../../components/note-editor/note-editor.component';
import { NgIf } from '@angular/common';

/**
 * The main shell of the notes app.
 * Handles notes retrieval and orchestration of sub-components.
 */
// PUBLIC_INTERFACE
@Component({
  selector: 'notes-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
  standalone: true,
  imports: [TopBarComponent, NoteListSidebarComponent, NoteEditorComponent, NgIf]
})
export class ShellComponent {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  selectedNoteId: string | null = null;
  searchQuery = '';
  creatingNote = false;

  private noteService: NoteService;
  constructor(noteService: NoteService) {
    this.noteService = noteService;
  }

  ngOnInit() {
    this.noteService.getNotes$().subscribe((notes) => {
      this.notes = notes;
      this.applyFilter();
      if (notes.length > 0 && (!this.selectedNoteId || !notes.find(n => n.id === this.selectedNoteId))) {
        this.selectedNoteId = notes[0].id;
      }
      if (notes.length === 0) {
        this.selectedNoteId = null;
      }
      if (this.creatingNote && notes.length > 0) {
        this.selectedNoteId = notes[0].id;
        this.creatingNote = false;
      }
    });
  }

  onSelectNote(id: string) {
    this.selectedNoteId = id;
    this.creatingNote = false;
  }

  onSearch(query: string) {
    this.searchQuery = query;
    this.applyFilter();
  }
  applyFilter() {
    if (!this.searchQuery.trim()) {
      this.filteredNotes = this.notes;
    } else {
      this.filteredNotes = this.noteService.searchNotes(this.searchQuery);
    }
  }

  onCreateNote() {
    this.creatingNote = true;
    this.selectedNoteId = null;
  }

  onSaveNewNote(data: { title: string; content: string }) {
    this.noteService.addNote(data.title, data.content);
    // The subscription will re-hydrate UI and select the new note via ngOnInit
  }

  onEditNote(data: { title: string; content: string }) {
    if (!this.selectedNoteId) return;
    this.noteService.updateNote(this.selectedNoteId, data.title, data.content);
  }

  onDeleteNote() {
    if (!this.selectedNoteId) return;
    this.noteService.deleteNote(this.selectedNoteId);
    // The subscription will update the list and select a note if present
  }

  onCancelEditing() {
    this.creatingNote = false;
    // Restore selection if possible
    if (this.notes.length) {
      this.selectedNoteId = this.notes[0].id;
    }
  }

  get selectedNote(): Note | null {
    return this.selectedNoteId
      ? this.notes.find((n) => n.id === this.selectedNoteId) || null
      : null;
  }
}
