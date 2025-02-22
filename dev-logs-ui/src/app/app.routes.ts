import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route redirects to /home
  { path: 'home', component: HomeComponent }, // Route for HomeComponent
  { path: '**', redirectTo: 'home' }, // Wildcard route redirects to /home
];
