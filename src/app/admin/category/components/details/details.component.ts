import { Component, OnInit } from '@angular/core';
import { QuestionCardComponent } from '../../../question/components/question-card/question-card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

import * as fromApp from '../../../../state/app.state';
import * as CategoryActions from '../../state/category.actions';
import * as QuestionActions from '../../../question/state/question.actions';
import { Store } from '@ngrx/store';
import { Category } from '../../../models/category.interface';
import { Question } from '../../../models/question.interface';
import { getCategory } from '../../state/category.reducer';
import { getQuestions } from '../../../question/state/question.reducer';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestionCreateEditComponent } from '../../../question/components/question-create-edit/question-create-edit.component';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule, RouterModule, QuestionCardComponent, QuestionCreateEditComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {

  category: Category;
  questions: Question[];
  questionForm: FormGroup;

  showForm: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      'question': new FormControl(null, Validators.required),
    })

    this.route.params.subscribe(param => {
      const id = param['id'];

      if (id) {
        this.store.dispatch(new CategoryActions.LoadItemAction(id));
        this.store.select(getCategory).subscribe(category => {
          this.category = category;

        this.store.dispatch(new QuestionActions.LoadItemsAction(id));
        this.store.select(getQuestions).subscribe(questions => {
          this.questions = questions;
        })
        })
      }
    })
  }

  addOrEditQuestion() {
    this.showForm = true;
  }

  submitQuestion() {
    if (!this.questionForm.valid) {
      return;
    }
  }

}
