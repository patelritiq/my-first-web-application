import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// @Component({}) → Tells Angular "this is a UI piece"
@Component({
  selector: 'app-root', // Matches <app-root> in index.html
  imports: [RouterOutlet], // RouterOutlet → Shows content from app.routes.ts
  templateUrl: './app.html', // "Use this HTML file"
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('student-ui'); //Signal state - Data passed to app.html
}
