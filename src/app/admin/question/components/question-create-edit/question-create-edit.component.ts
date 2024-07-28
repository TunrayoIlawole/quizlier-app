import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import * as fromApp from '../../../../state/app.state';
import * as QuestionActions from '../../state/question.actions';
import * as CategoryActions from '../../../category/state/category.actions';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { getQuestion } from '../../state/question.reducer';
import { Question } from '../../../models/question.interface';
import { Category } from '../../../models/category.interface';
import { getCategory } from '../../../category/state/category.reducer';

@Component({
  selector: 'app-question-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './question-create-edit.component.html',
  styleUrl: './question-create-edit.component.css'
})
export class QuestionCreateEditComponent implements OnInit {

  questionForm: FormGroup;
  question: Question;
  isSubmitting = false;
  submitted: boolean;
  isLoading: boolean = false;
  category: Category;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit(): void {
    this.questionForm = new FormGroup({
      'question': new FormControl(null, Validators.required),
    });

    this.route.params.subscribe(params => {
      const id = params['questionId'];
      const categoryId = params['id'];

      if (id && categoryId) {
        this.store.dispatch(new QuestionActions.LoadItemAction(id));
        this.store.dispatch(new CategoryActions.LoadItemAction(categoryId));
        this.store.select(getCategory).subscribe(category => {
          this.category = category;
        });
        
        this.store.select(getQuestion).subscribe(question => {
          if (question == null) {
            return
          }
          this.submitted = false;
          this.isSubmitting = false;
          this.question = question;

          this.questionForm.patchValue({
            'question': question.question
          })
        })

      }
    })
  }

  createOrUpdateQuestion() {
    this.isSubmitting = true;
    this.isLoading = true;

    if (!this.questionForm.valid) {
      return;
    }

    const newQuestion = {} as Question;

    newQuestion.question = this.questionForm.get('question').value;

    if (this.question) {
      newQuestion.id = this.question.id;
      this.store.dispatch(new QuestionActions.UpdateItemAction(this.question.id, newQuestion, true));
    } else {
      this.store.dispatch(new QuestionActions.AddItemAction(newQuestion, this.category.id));
    }
  }

}
