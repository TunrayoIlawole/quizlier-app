import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../../../state/app.state';
import * as QuestionActions from '../../state/question.actions';
import * as OptionActions from '../../../option/state/option.actions';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Question } from '../../../models/question.interface';
import { Option } from '../../../models/option.interface';
import { getQuestion } from '../../state/question.reducer';
import { getOptions } from '../../../option/state/options.reducer';
import { OptionCardComponent } from '../../../option/components/option-card/option-card.component';

@Component({
  selector: 'app-question-details',
  standalone: true,
  imports: [CommonModule, RouterModule, OptionCardComponent],
  templateUrl: './question-details.component.html',
  styleUrl: './question-details.component.css'
})
export class QuestionDetailsComponent implements OnInit {

  question: Question;
  options: Option[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.State>
  ) {}

   ngOnInit(): void {
    this.route.params.subscribe(param => {
      const id = param['questionId'];

      if (id) {
        this.store.dispatch(new QuestionActions.LoadItemAction(id));
        this.store.select(getQuestion).subscribe(category => {
          this.question = this.question;

        this.store.dispatch(new OptionActions.LoadItemsAction(id));
        this.store.select(getOptions).subscribe(options => {
          this.options = options;
        })
        })
      }
    })
   }
}


// 186