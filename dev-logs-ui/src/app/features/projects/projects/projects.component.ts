import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrimeNGModule } from '../../../shared/modules/primeng/primeng.module';
import { ProjectDataApiService } from '../../../shared/services/project-data-api.service';
import { Observable } from 'rxjs';
import { ApiResponseMessage, Category, Project } from '../../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CategoryDataApiService } from '../../../shared/services/category-data-api.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessagesService } from '../../../shared/services/messages.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [PrimeNGModule, CommonModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  category$ !: Observable<Category>;
  projects$ !: Observable<Project[]>;
  categoryId!: string;

  displayAddProjectDialog: boolean = false;
  addProjectForm !: FormGroup


  constructor(
    public projectDataApiService: ProjectDataApiService,
    private categoryDataApiService: CategoryDataApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.addProjectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', []],
    });

    this.categoryId = this.route.snapshot.paramMap.get("id") || '';
    this.category$ = this.categoryDataApiService.getCategoryById(this.categoryId)
    this.projects$ = this.projectDataApiService.getAllProjectsForCategory(this.categoryId);
  }

  showAddProjectDialog(): void {
    this.displayAddProjectDialog = true;
  }

  hideAddProjectDialog(): void {
    this.displayAddProjectDialog = false;

    this.addProjectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', []],
    });
  }


  createProject(): void {
    this.addProjectForm.patchValue({
      categoryId: this.categoryId
    })

    this.projectDataApiService.createProject(this.addProjectForm.getRawValue())
      .subscribe(
        (res: ApiResponseMessage) => {
          if (res.status === 200) {
            this.messagesService.showSuccess(res.summary, res.details);
            this.hideAddProjectDialog();
            this.projects$ = this.projectDataApiService.getAllProjectsForCategory(this.categoryId);
          }
        },
        (err) => {
          this.messagesService.showError(err.error.summary, err.error.details);
        }
      );
  }

  deleteProject(project: Project): void {
    console.log(project)
    this.projectDataApiService.deleteProjectById(project.id)
      .subscribe(
        (res: ApiResponseMessage) => {
          if (res.status === 200) {
            this.messagesService.showSuccess(res.summary, res.details);
            this.hideAddProjectDialog();
            this.projects$ = this.projectDataApiService.getAllProjectsForCategory(this.categoryId);
          }
        },
        (err) => {
          this.messagesService.showError(err.error.summary, err.error.details);
        }
      );
  }

  deleteProjectPopup(project: Project): void {
    console.log(project)
    this.confirmationService.confirm({
      header: 'Delete',
      // position: 'bottom',
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
        severity: 'danger'
      },
      accept: () => {
        this.deleteProject(project)
      },
      reject: () => { }
    });
  }
}
