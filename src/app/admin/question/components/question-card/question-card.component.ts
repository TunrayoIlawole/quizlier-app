import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import * as fromApp from '../../../../state/app.state';
import * as QuestionActions from '../../state/question.actions';
import { Store } from '@ngrx/store';
import { Question } from '../../../models/question.interface';
import { Option } from '../../../models/option.interface';
import { getQuestion } from '../../state/question.reducer';
import { getOptions } from '../../../option/state/options.reducer';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.css'
})
export class QuestionCardComponent {
  @Input() question: Question;

  constructor(
    private store: Store<fromApp.State>
  ) {}


  deleteQuestion(questionId: number) {
    this.store.dispatch(new QuestionActions.DeleteItemAction(questionId))
  }
}
