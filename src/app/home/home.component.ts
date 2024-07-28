import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  login(): void {
    this.router.navigate(['/auth/login']);
  }

  signup() {
    this.router.navigate(['/auth/register']);
  }
  
  signupAdmin(role: string) {
    this.router.navigate(['/auth/register'], { queryParams: { role }});
  }

  admin() {
    this.router.navigate(['/admin'])
  }

}
