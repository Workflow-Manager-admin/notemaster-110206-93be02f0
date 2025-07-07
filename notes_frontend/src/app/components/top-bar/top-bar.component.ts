import { Component, Input } from '@angular/core';

// PUBLIC_INTERFACE
@Component({
  selector: 'top-bar',
  standalone: true,
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  @Input() totalNotes = 0;
}
