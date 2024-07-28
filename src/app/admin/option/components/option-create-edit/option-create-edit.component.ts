import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../../../state/app.state';
import * as OptionActions from '../../state/option.actions';
import * as QuestionActions from '../../../question/state/question.actions';

import { Store } from '@ngrx/store';
import { Question } from '../../../models/question.interface';
import { Option } from '../../../models/option.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { getQuestion } from '../../../question/state/question.reducer';
import { getOption } from '../../state/options.reducer';

@Component({
  selector: 'app-option-create-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './option-create-edit.component.html',
  styleUrl: './option-create-edit.component.css'
})
export class OptionCreateEditComponent implements OnInit {
  optionForm: FormGroup;
  question: Question;
  isSubmitting = false;
  submitted: boolean;
  isLoading: boolean = false;
  option: Option;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit(): void {
    this.optionForm = new FormGroup({
      'option': new FormControl(null, Validators.required),
      'correct': new FormControl(null)
    });

    this.route.params.subscribe(params => {
      const id = params['optionId'];
      const questionId = params['questionId']

      if (id && questionId) {
        this.store.dispatch(new OptionActions.LoadItemAction(id));
        this.store.dispatch(new QuestionActions.LoadItemAction(questionId));
        this.store.select(getQuestion).subscribe(question => {
          this.question = question;
        });
        
        this.store.select(getOption).subscribe(option => {
          if (option == null) {
            return
          }
          this.submitted = false;
          this.isSubmitting = false;
          this.option = option;

          this.optionForm.patchValue({
            'option': option.optionText,
            'correct': option.isCorrect
          })
        })
      }
    })
  }

  createOrUpdateOption() {
    this.isSubmitting = true;
    this.isLoading = true;

    if (!this.optionForm.valid) {
      return;
    }

    const newOption = {} as Option;

    newOption.optionText = this.optionForm.get('option').value;
    newOption.isCorrect = this.optionForm.get('correct').value || false;

    if (this.option) {
      newOption.id = this.option.id;
      this.store.dispatch(new OptionActions.UpdateItemAction(newOption, this.option.id, true));
    } else {
      this.store.dispatch(new OptionActions.AddItemAction(newOption, this.question.id));
    }
  }

}
