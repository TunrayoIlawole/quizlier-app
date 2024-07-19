import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { loadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../state/app.state';
import * as AuthActions from '../state/auth.actions';
import { AlertComponent } from '../../shared/alert/alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, loadingSpinnerComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading: boolean = false;
  error: string = '';
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;
  private storeSub: Subscription;

  constructor(private viewContainerRef: ViewContainerRef, private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('user').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });

    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }));

    this.loginForm.reset();

  }

  private showErrorAlert(message: string) {
    // const alertCmpFactory = this.viewContainerRef.createComponent(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

}
