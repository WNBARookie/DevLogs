import { Component, OnInit } from '@angular/core';
import { PrimeNGModule } from '../../shared/modules/primeng/primeng.module';
import { Observable } from 'rxjs';
import { Category } from '../../shared/interfaces';
import { CategoryDataApiService } from '../../shared/services/category-data-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PrimeNGModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit{
  categories$ !: Observable<Category[]>;

  constructor(private categoryDataApiService: CategoryDataApiService){}

  ngOnInit(): void {
    this.categories$ = this.categoryDataApiService.getAllCategories();
  }
}
