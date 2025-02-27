import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ApiResponseMessage, Item } from '../../../shared/interfaces';
import { PrimeNGModule } from '../../../shared/modules/primeng/primeng.module';
import { ItemDataApiService } from '../../../shared/services/item-data-api.service';
import { MessagesService } from '../../../shared/services/messages.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [PrimeNGModule, CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss',
})
export class ItemFormComponent implements OnInit {
  @Input()
  currentItem!: Item;
  @Input()
  projectId!: string;
  itemForm!: FormGroup;
  @Input()
  displayItemDialog: boolean = false;

  @Output()
  itemDialogStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  refreshData: EventEmitter<boolean> = new EventEmitter<boolean>();

  dialogTitle: string = 'Add Item';
  actionButtonTitle: string = 'Add';
  action: string = 'add';

  constructor(
    public itemDataApiService: ItemDataApiService,
    private fb: FormBuilder,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      skillsApplied: ['', [Validators.required]],
      lessonsLearned: ['', [Validators.required]],
      dateCompleted: [new Date(), [Validators.required]],
      projectId: ['', []],
      itemId: ['', []],
    });

    if (this.currentItem) {
      this.dialogTitle = 'Edit Item';
      this.actionButtonTitle = 'Save';
      this.action = 'edit';
      this.itemForm.patchValue({
        title: this.currentItem.title,
        description: this.currentItem.description,
        skillsApplied: this.currentItem.skillsApplied,
        lessonsLearned: this.currentItem.lessonsLearned,
        dateCompleted: new Date(this.currentItem.dateCompleted),
        itemId: this.currentItem.id,
      });
    }
  }

  showItemDialog(): void {
    this.displayItemDialog = true;
    this.itemDialogStatus.emit(true);
  }

  hideItemDialog(): void {
    this.displayItemDialog = false;

    this.itemForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      skillsApplied: ['', [Validators.required]],
      lessonsLearned: ['', [Validators.required]],
      dateCompleted: [, [Validators.required]],
      projectId: ['', []],
      itemId: ['', []],
    });

    this.itemDialogStatus.emit(false);
  }

  onSubmitItem(): void {
    if (this.action === 'add') {
      this.createItem();
    } else {
      this.updateItem();
    }
  }

  createItem(): void {
    this.itemForm.patchValue({
      projectId: this.projectId,
    });

    this.itemForm.removeControl('itemId');

    this.itemDataApiService.createItem(this.itemForm.getRawValue()).subscribe(
      (res: ApiResponseMessage) => {
        if (res.status === 200) {
          this.messagesService.showSuccess(res.summary, res.details);
          this.hideItemDialog();
          this.refreshData.emit(true);
        }
      },
      (err) => {
        this.messagesService.showError(err.error.summary, err.error.details);
      }
    );
  }

  updateItem(): void {
    this.itemForm.removeControl('projectId');

    this.itemDataApiService.updateItem(this.itemForm.getRawValue()).subscribe(
      (res: ApiResponseMessage) => {
        if (res.status === 200) {
          this.messagesService.showSuccess(res.summary, res.details);
          this.hideItemDialog();
          this.refreshData.emit(true);
        }
      },
      (err) => {
        this.messagesService.showError(err.error.summary, err.error.details);
      }
    );
  }
}
