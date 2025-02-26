import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmPopupModule,
    ConfirmDialogModule
  ],
  exports: [
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmPopupModule,
    ConfirmDialogModule
  ],
})
export class PrimeNGModule { }
