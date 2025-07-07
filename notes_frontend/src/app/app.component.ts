import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DarkModeToggleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';
  darkMode = false;

  constructor() {
    this.loadDarkMode();
  }

  /** Load persisted theme preference or fallback to media query */
  loadDarkMode() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const theme = window.localStorage.getItem('theme');
      if (theme) {
        this.darkMode = (theme === 'dark');
      } else {
        // Use media query as fallback if no local preference.
        this.darkMode =
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
    }
    this.applyTheme();
  }

  /** PUBLIC_INTERFACE: Triggered by toggle button to switch theme */
  onDarkModeToggle(newValue: boolean) {
    this.darkMode = newValue;
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('theme', newValue ? 'dark' : 'light');
    }
    this.applyTheme();
  }

  /** Apply appropriate theme class to document root */
  applyTheme() {
    if (typeof document !== 'undefined') {
      if (this.darkMode) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
    }
  }
}
