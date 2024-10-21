import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = { username: '', password: '', email: '' };
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    this.authService.register(this.user).subscribe(
      () => {
        this.router.navigate(['/login']); // Redirect to login on success
      },
      (error) => {
        this.errorMessage = error.error.message || 'Registration failed';
      }
    );
  }
}
