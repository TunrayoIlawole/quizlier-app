import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as fromApp from '../../../../state/app.state';
import * as OptionActions from '../../state/option.actions';
import { Store } from '@ngrx/store';
import { Question } from '../../../models/question.interface';
import { Option } from '../../../models/option.interface';

@Component({
  selector: 'app-option-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './option-card.component.html',
  styleUrl: './option-card.component.css'
})
export class OptionCardComponent {

  constructor(
    private store: Store<fromApp.State>
  ) {}

  @Input() option: Option;

  deleteOption(id: number) {
    this.store.dispatch(new OptionActions.DeleteItemAction(id));
  }

}
