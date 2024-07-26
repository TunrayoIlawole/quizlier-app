import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component';
import { CategoryResponseDto } from '../../../dto/category-response.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../state/app.state';
import * as CategoryActions from '../../state/category.actions';
import { getCategory } from '../../state/category.reducer';
import { Category } from '../../../models/category.interface';

@Component({
  selector: 'app-category-create-or-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, loadingSpinnerComponent],
  templateUrl: './create-or-edit.component.html',
  styleUrl: './create-or-edit.component.css'
})
export class CreateOrEditComponent implements OnInit {

  category: Category;
  categoryForm: FormGroup;
  isSubmitting = false;
  submitted: boolean;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      'categoryname': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
    })

    this.route.params.subscribe(params => {
      const id = params['id'];

      if (id) {
        this.store.dispatch(new CategoryActions.LoadItemAction(id));
        this.store.select(getCategory).subscribe(category => {
          if (category == null) {
            return
          }
          this.submitted = false;
          this.isSubmitting = false;
          this.category = category;

          this.categoryForm.patchValue({
            'categoryname': category.name,
            'description': category.description
          })
        })

      }
    })
  }

  createOrUpdateCategory() {
    this.isSubmitting = true;
    this.isLoading = true;

    if (!this.categoryForm.valid) {
      return;
    }

    const newCategory = {} as Category;

    newCategory.name = this.categoryForm.get('categoryname').value;
    newCategory.description = this.categoryForm.get('description').value;

    if (this.category) {
      newCategory.id = this.category.id;
      this.store.dispatch(new CategoryActions.UpdateItemAction(this.category.id, newCategory, true));
    } else {
      this.store.dispatch(new CategoryActions.AddItemAction(newCategory));
    }
  }

}
