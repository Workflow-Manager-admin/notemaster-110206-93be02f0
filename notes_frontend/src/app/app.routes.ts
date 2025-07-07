import { Routes } from '@angular/router';
import { ShellComponent } from './pages/shell/shell.component';

export const routes: Routes = [
  { path: '', component: ShellComponent, pathMatch: 'full' }
];
