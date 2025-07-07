import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   constructor(private router: Router) {}

    toggleDarkMode(event: any) {
  const isDark = event.target.checked;
  document.body.classList.toggle('dark-mode', isDark);
}


  confirmLogout() {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      localStorage.removeItem('jwt'); // Adjust key if you used a different one
      this.router.navigate(['/login']);
    }
  }

}
