import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

/**
 * NoteService handles all CRUD operations on notes, using local storage.
 */
// PUBLIC_INTERFACE
@Injectable({
  providedIn: 'root',
})
export class NoteService {
  /** Observable notes list */
  private notesSubject = new BehaviorSubject<Note[]>([]);
  /** Internal cache for notes */
  private notes: Note[] = [];

  constructor() {
    this.loadFromStorage();
  }

  /** Load notes from localStorage */
  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        const notesStr = window.localStorage.getItem('notes');
        this.notes = notesStr ? JSON.parse(notesStr) : [];
      } else {
        this.notes = [];
      }
    } catch {
      this.notes = [];
    }
    this.notesSubject.next(this.notes);
  }

  /** Write notes to localStorage */
  private saveToStorage(): void {
    try {
      if (typeof window !== 'undefined' && 'localStorage' in window) {
        window.localStorage.setItem('notes', JSON.stringify(this.notes));
      }
    } catch {
      // Ignore storage error (e.g., SSR or disabled storage)
    }
    this.notesSubject.next([...this.notes]);
  }

  /** PUBLIC_INTERFACE: Get all notes as observable */
  getNotes$(): Observable<Note[]> {
    return this.notesSubject.asObservable();
  }

  /** PUBLIC_INTERFACE: Add a note */
  addNote(title: string, content: string): void {
    const now = new Date().toISOString();
    const newNote: Note = {
      id: uuidv4(),
      title: title || 'Untitled Note',
      content: content || '',
      createdAt: now,
      updatedAt: now,
    };
    this.notes.unshift(newNote); // add to top
    this.saveToStorage();
  }

  /** PUBLIC_INTERFACE: Update a note */
  updateNote(id: string, title: string, content: string): void {
    const idx = this.notes.findIndex((n) => n.id === id);
    if (idx !== -1) {
      this.notes[idx] = {
        ...this.notes[idx],
        title,
        content,
        updatedAt: new Date().toISOString(),
      };
      this.saveToStorage();
    }
  }

  /** PUBLIC_INTERFACE: Delete a note */
  deleteNote(id: string): void {
    this.notes = this.notes.filter((n) => n.id !== id);
    this.saveToStorage();
  }

  /** PUBLIC_INTERFACE: Get note by ID */
  getNote(id: string): Note | undefined {
    return this.notes.find((n) => n.id === id);
  }

  /** PUBLIC_INTERFACE: Search notes by query in title/content */
  searchNotes(query: string): Note[] {
    if (!query.trim()) return this.notes;
    const q = query.toLowerCase();
    return this.notes.filter(
      n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }
}
