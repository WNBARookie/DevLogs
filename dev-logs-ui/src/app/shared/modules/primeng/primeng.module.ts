import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { AccordionModule } from 'primeng/accordion';
import { MenuModule } from 'primeng/menu';
import { TextareaModule } from 'primeng/textarea';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    DatePickerModule,
    PanelModule,
    DividerModule,
    AccordionModule,
    MenuModule,
    TextareaModule,
  ],
  exports: [
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmDialogModule,
    DatePickerModule,
    PanelModule,
    DividerModule,
    AccordionModule,
    MenuModule,
    TextareaModule,
  ],
})
export class PrimeNGModule {}
