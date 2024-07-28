import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { AuthComponent } from './auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
     CommonModule,
     ReactiveFormsModule,
     HomeComponent, 
     AuthComponent,
     AdminComponent,
     CategoryComponent
    ],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quizlier-app';
}
