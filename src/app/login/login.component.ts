import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { InvoiceService } from '../invoice.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router , private service:InvoiceService) {}

  login() {
    const body = { username: this.username, password: this.password };

    this.service.login(this.username, this.password).subscribe(
      response => {
              console.log("Login successful", response);
              localStorage.setItem('userId' , response.userId);
              localStorage.setItem('jwt' , response.token);
              localStorage.setItem('AuthorName' , response.AuthorName);
              this.router.navigate(['/home']);
      },
      error => {
          console.error('Login failed', error);
      }
    )
  }
}
