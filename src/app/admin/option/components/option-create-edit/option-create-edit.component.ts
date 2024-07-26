import { Component } from '@angular/core';

import * as fromApp from '../../../../state/app.state';
import * as OptionActions from '../../state/option.actions';
import { Store } from '@ngrx/store';
import { Question } from '../../../models/question.interface';
import { Option } from '../../../models/option.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-option-create-edit',
  standalone: true,
  imports: [],
  templateUrl: './option-create-edit.component.html',
  styleUrl: './option-create-edit.component.css'
})
export class OptionCreateEditComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.State>
  ) {}

}
