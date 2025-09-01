import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPage } from './pages/login/login-page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('app_movie_spring_boot');
}
