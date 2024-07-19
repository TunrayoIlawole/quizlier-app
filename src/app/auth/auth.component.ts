import { Component } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'signup', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
]

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    RegisterComponent, 
    LoginComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
