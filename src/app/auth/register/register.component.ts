import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromApp from '../../state/app.state';
import * as AuthActions from '../state/auth.actions';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../shared/alert/alert.component';
import { loadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, loadingSpinnerComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
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

    this.signupForm = new FormGroup({
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null),
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    if (!this.signupForm.valid) {
      return;
    }

    const firstName = this.signupForm.get('firstname').value;
    const lastName = this.signupForm.get('lastname').value;
    const username = this.signupForm.get('username').value;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;

    this.store.dispatch(new AuthActions.RegisterStart({ firstName: firstName, lastName: lastName, username: username, email: email, password: password }));

    this.signupForm.reset();

    // route to sign up page

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