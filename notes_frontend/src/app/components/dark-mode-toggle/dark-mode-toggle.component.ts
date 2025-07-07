import { Component, EventEmitter, Output, Input } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'dark-mode-toggle',
  standalone: true,
  template: `
    <button
      class="dark-mode-toggle"
      (click)="onToggle()"
      [attr.aria-pressed]="darkMode"
      [attr.title]="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
      [class.active]="darkMode"
    >
      <span *ngIf="!darkMode" class="toggle-icon" aria-hidden="true">&#x1F31E;</span>
      <span *ngIf="darkMode" class="toggle-icon" aria-hidden="true">&#x1F319;</span>
      <span class="toggle-label">{{darkMode ? 'Dark' : 'Light'}} mode</span>
    </button>
  `,
  styleUrl: './dark-mode-toggle.component.css'
})
export class DarkModeToggleComponent {
  @Input() darkMode = false;
  @Output() toggle = new EventEmitter<boolean>();

  onToggle() {
    this.toggle.emit(!this.darkMode);
  }
}
