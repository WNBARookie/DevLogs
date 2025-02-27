import { Component, OnInit } from '@angular/core';
import { ApiResponseMessage, Item, Project } from '../../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MessagesService } from '../../../shared/services/messages.service';
import { ProjectDataApiService } from '../../../shared/services/project-data-api.service';
import { ItemDataApiService } from '../../../shared/services/item-data-api.service';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from '../../../shared/modules/primeng/primeng.module';
import { ItemFormComponent } from '../../items/item-form/item-form.component';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [PrimeNGModule, CommonModule, ItemFormComponent],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss',
})
export class ProjectDetailsComponent implements OnInit {
  project$!: Observable<Project>;
  items$!: Observable<Item[]>;
  projectId!: string;

  displayItemDialog: boolean = false;
  currentItem!: Item;
  menuItems: MenuItem[] = [];

  summaryGenerated: boolean = false;
  summary: string = '';

  constructor(
    public itemDataApiService: ItemDataApiService,
    public projectDataApiService: ProjectDataApiService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.project$ = this.projectDataApiService.getProjectById(this.projectId);
    this.items$ = this.itemDataApiService.getAllItemsForProject(this.projectId);
    this.menuItems = [];
  }

  getMenuItemsForItem(item: Item): MenuItem[] {
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.showItemDialog(item),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.deleteItemPopup(item),
      },
    ];
  }

  toggleMenu(menu: any, event: any, item: Item) {
    this.menuItems = [];

    this.menuItems.push({
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => this.showItemDialog(item),
    });
    this.menuItems.push({
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.deleteItemPopup(item),
    });

    menu.toggle(event);
  }

  showItemDialog(item: any): void {
    this.displayItemDialog = true;
    this.currentItem = item;
  }

  showItemDialogToggle(value: any) {
    this.displayItemDialog = value;
  }

  refreshData(value: any) {
    if (value) {
      this.items$ = this.itemDataApiService.getAllItemsForProject(
        this.projectId
      );
    }
  }

  deleteItem(item: Item): void {
    this.itemDataApiService.deleteItemById(item.id).subscribe(
      (res: ApiResponseMessage) => {
        if (res.status === 200) {
          this.messagesService.showSuccess(res.summary, res.details);
          this.refreshData(true);
          // this.items$ = this.itemDataApiService.getAllItemsForProject(
          //   this.projectId
          // );
        }
      },
      (err) => {
        this.messagesService.showError(err.error.summary, err.error.details);
      }
    );
  }

  deleteItemPopup(item: Item): void {
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
        this.deleteItem(item);
      },
      reject: () => {},
    });
  }

  generateSummary(): void {
    this.summaryGenerated = !this.summaryGenerated;
    this.summary =
      'In this project...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  }
}
