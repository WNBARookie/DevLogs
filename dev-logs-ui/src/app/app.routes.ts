import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProjectsComponent } from './features/projects/projects/projects.component';
import { ProjectDetailsComponent } from './features/projects/project-details/project-details.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route redirects to /home
  { path: 'home', component: HomeComponent }, // Route for HomeComponent
  { path: 'projects/:id', component: ProjectsComponent }, // Route for ProjectsComponent
  { path: 'projects/details/:id', component: ProjectDetailsComponent }, // Route for ProjectDetailsComponent
  { path: '**', redirectTo: 'home' }, // Wildcard route redirects to /home
];
