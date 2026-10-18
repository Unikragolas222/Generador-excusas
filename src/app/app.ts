import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExcusaService } from './services/excusa';
import { GifService } from './services/gif';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Generador-excusas');

  private excusaService = inject(ExcusaService);
  private gifService = inject(GifService);

  constructor() {
    // Prueba 1: excusa
    this.excusaService.getExcusa('college').subscribe(datos => {
      console.log(datos);
    });

    // Prueba 2: GIF
    this.gifService.getGif('tired student').subscribe(url => {
      console.log(url);
    });
  }
}