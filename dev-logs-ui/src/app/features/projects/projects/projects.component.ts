import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../shared/modules/primeng/primeng.module';
import { ProjectDataApiService } from '../../../shared/services/project-data-api.service';
import { Observable } from 'rxjs';
import { Category, Project } from '../../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CategoryDataApiService } from '../../../shared/services/category-data-api.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PrimeNGModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  category$ !: Observable<Category>;
  projects$ !: Observable<Project[]>;
  categoryId!: string;


  constructor(
    public projectDataApiService: ProjectDataApiService,
    private categoryDataApiService: CategoryDataApiService,
    private route: ActivatedRoute
    // private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get("id") || '';
    this.category$ = this.categoryDataApiService.getCategoryById(this.categoryId)
    this.projects$ = this.projectDataApiService.getAllProjectsForCategory(this.categoryId);
  }
}
