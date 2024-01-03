import { Component } from '@angular/core';
import { MainComponent } from '../assets/components/main/main.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MainComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'trainees-app';
}
