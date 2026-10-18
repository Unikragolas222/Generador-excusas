import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategorySelector } from './components/category-selector/category-selector';

@Component({
  imports: [RouterOutlet, CategorySelector],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Generador-excusas');

  category = signal('');

  choose(value: string) {
    this.category.set(value);
  }
}