import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  constructor(private messageService: MessageService) { }

  showSuccess(
    summary: string,
    details: string = '',
    delay: boolean = false
  ): void {
    let delayInMS = delay ? 1000 : 0;

    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: summary,
        detail: details,
        life: 5000,
      });
    }, delayInMS);
  }

  showError(
    summary: string,
    details: string = '',
    delay: boolean = false
  ): void {
    let delayInMS = delay ? 1000 : 0;

    setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: summary,
        detail: details,
        life: 5000,
        closable: true,
      });
    }, delayInMS);
  }

  showInfo(
    summary: string,
    details: string = '',
    delay: boolean = false
  ): void {
    let delayInMS = delay ? 1000 : 0;

    setTimeout(() => {
      this.messageService.add({
        severity: 'info',
        summary: summary,
        detail: details,
      });
    }, delayInMS);
  }
}
