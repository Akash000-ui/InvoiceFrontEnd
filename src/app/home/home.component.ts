import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    toggleDarkMode(event: any) {
  const isDark = event.target.checked;
  document.body.classList.toggle('dark-mode', isDark);
}

}
