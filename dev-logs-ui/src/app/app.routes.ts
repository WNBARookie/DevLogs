import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProjectsComponent } from './features/projects/projects/projects.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route redirects to /home
  { path: 'home', component: HomeComponent }, // Route for HomeComponent
  { path: 'projects/:id', component: ProjectsComponent }, // Route for ProjectsComponent
  { path: '**', redirectTo: 'home' }, // Wildcard route redirects to /home
];
