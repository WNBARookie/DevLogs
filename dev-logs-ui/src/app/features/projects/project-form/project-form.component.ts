import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessagesService } from '../../../shared/services/messages.service';
import { ProjectDataApiService } from '../../../shared/services/project-data-api.service';
import { ApiResponseMessage, Project } from '../../../shared/interfaces';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../../../shared/modules/primeng/primeng.module';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [PrimeNGModule, CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss',
})
export class ProjectFormComponent implements OnInit {
  @Input()
  currentProject!: Project;
  @Input()
  categoryId!: string;
  projectForm!: FormGroup;
  @Input()
  displayProjectDialog: boolean = false;

  @Output()
  projectDialogStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  refreshData: EventEmitter<boolean> = new EventEmitter<boolean>();

  dialogTitle: string = 'Add Project';
  actionButtonTitle: string = 'Add';
  action: string = 'add';

  constructor(
    public projectDataApiService: ProjectDataApiService,
    private fb: FormBuilder,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', []],
      projectId: ['', []],
    });

    if (this.currentProject) {
      this.dialogTitle = 'Edit Project';
      this.actionButtonTitle = 'Save';
      this.action = 'edit';
      this.projectForm.patchValue({
        title: this.currentProject.title,
        description: this.currentProject.description,
        projectId: this.currentProject.id,
      });
    }
  }

  showProjectDialog(): void {
    this.displayProjectDialog = true;
    this.projectDialogStatus.emit(true);
  }

  hideProjectDialog(): void {
    this.displayProjectDialog = false;

    this.projectForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      categoryId: ['', []],
      projectId: ['', []],
    });

    this.projectDialogStatus.emit(false);
  }

  onSubmitProject(): void {
    if (this.action === 'add') {
      this.createProject();
    } else {
      this.updateProject();
    }
  }

  createProject(): void {
    this.projectForm.patchValue({
      categoryId: this.categoryId,
    });

    this.projectForm.removeControl('projectId');

    this.projectDataApiService
      .createProject(this.projectForm.getRawValue())
      .subscribe(
        (res: ApiResponseMessage) => {
          if (res.status === 200) {
            this.messagesService.showSuccess(res.summary, res.details);
            this.hideProjectDialog();
            this.refreshData.emit(true);
          }
        },
        (err) => {
          this.messagesService.showError(err.error.summary, err.error.details);
        }
      );
  }

  updateProject(): void {
    this.projectForm.removeControl('categoryId');

    this.projectDataApiService
      .updateProject(this.projectForm.getRawValue())
      .subscribe(
        (res: ApiResponseMessage) => {
          if (res.status === 200) {
            this.messagesService.showSuccess(res.summary, res.details);
            this.hideProjectDialog();
            this.refreshData.emit(true);
          }
        },
        (err) => {
          this.messagesService.showError(err.error.summary, err.error.details);
        }
      );
  }
}
