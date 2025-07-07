import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// PUBLIC_INTERFACE
@Component({
  selector: 'note-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './note-editor.component.html',
  styleUrl: './note-editor.component.css'
})
export class NoteEditorComponent {
  @Input() note: Note | null = null;
  @Input() isNew = false;
  @Output() save = new EventEmitter<{ title: string; content: string }>();
  @Output() delete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  editingTitle = '';
  editingContent = '';

  ngOnChanges() {
    this.editingTitle = this.note?.title || '';
    this.editingContent = this.note?.content || '';
  }

  onSave() {
    this.save.emit({ title: this.editingTitle, content: this.editingContent });
  }
  onDelete() {
    this.delete.emit();
  }
  onCancel() {
    this.cancel.emit();
  }
}
