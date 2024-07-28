import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../state/app.state';
import * as CategoryActions from '../../state/category.actions';
import { getCategories, getCategory } from '../../state/category.reducer';
import { Category } from '../../../models/category.interface';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class CategoryListComponent implements OnInit {
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new CategoryActions.LoadItemsAction());
    this.store.select(getCategories).subscribe(categories => {
      this.categories = categories;
    })
  }

  deleteCategory(category: Category) {
    this.store.dispatch(new CategoryActions.DeleteItemAction(category.id))
  }

}
