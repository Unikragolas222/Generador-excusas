import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { inject } from '@angular/core';
import { ExcusaService } from './services/excusa';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Generador-excusas');

    private excusaService = inject(ExcusaService);

  constructor() {
    this.excusaService.getExcusa('college').subscribe(datos => {
      console.log(datos);
    });
  }
}
