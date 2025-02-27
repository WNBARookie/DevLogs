import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../shared/modules/primeng/primeng.module';
import { ProjectDataApiService } from '../../../shared/services/project-data-api.service';
import { Observable } from 'rxjs';
import {
  ApiResponseMessage,
  Category,
  Project,
} from '../../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CategoryDataApiService } from '../../../shared/services/category-data-api.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MessagesService } from '../../../shared/services/messages.service';
import { ConfirmationService } from 'primeng/api';
import { ProjectFormComponent } from '../project-form/project-form.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    PrimeNGModule,
    CommonModule,
    ReactiveFormsModule,
    ProjectFormComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  category$!: Observable<Category>;
  projects$!: Observable<Project[]>;
  categoryId!: string;

  displayProjectDialog: boolean = false;
  currentProject!: Project;

  constructor(
    public projectDataApiService: ProjectDataApiService,
    private categoryDataApiService: CategoryDataApiService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id') || '';
    this.category$ = this.categoryDataApiService.getCategoryById(
      this.categoryId
    );
    this.projects$ = this.projectDataApiService.getAllProjectsForCategory(
      this.categoryId
    );
  }

  showProjectDialog(project: any): void {
    this.displayProjectDialog = true;
    this.currentProject = project;
  }

  showProjectDialogToggle(value: any) {
    this.displayProjectDialog = value;
  }

  refreshDataFromDialog(value: any) {
    if (value) {
      this.projects$ = this.projectDataApiService.getAllProjectsForCategory(
        this.categoryId
      );
    }
  }

  deleteProject(project: Project): void {
    this.projectDataApiService.deleteProjectById(project.id).subscribe(
      (res: ApiResponseMessage) => {
        if (res.status === 200) {
          this.messagesService.showSuccess(res.summary, res.details);
          this.projects$ = this.projectDataApiService.getAllProjectsForCategory(
            this.categoryId
          );
        }
      },
      (err) => {
        this.messagesService.showError(err.error.summary, err.error.details);
      }
    );
  }

  deleteProjectPopup(project: Project): void {
    this.confirmationService.confirm({
      header: 'Delete',
      message: 'Are you sure you want to delete?',
      icon: 'pi pi-exclamation-circle',
      rejectButtonProps: {
        label: 'Cancel',
        icon: 'pi pi-times',
        size: 'small',
        severity: 'secondary',
      },
      acceptButtonProps: {
        label: 'Delete',
        icon: 'pi pi-check',
        size: 'small',
        severity: 'danger',
      },
      accept: () => {
        this.deleteProject(project);
      },
      reject: () => {},
    });
  }
}
