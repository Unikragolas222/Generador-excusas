import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategorySelector } from './components/category-selector/category-selector';
import { ExcuseCard } from './components/excuse-card/excuse-card';
import { ExcuseService } from './services/excuse';
import { GifService } from './services/gif';

@Component({
  imports: [RouterOutlet, CategorySelector, ExcuseCard],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Generador-excusas');

  private excuseService = inject(ExcuseService);
  private gifService = inject(GifService);

  category = signal('');
  excuse = signal('');
  gif = signal('');
  loading = signal(false);

  // Qué texto buscamos en GIPHY según la categoría
  private searches: Record<string, string> = {
    college: 'triste',
    office: 'cansado en el trabajo',
    party: 'lo siento',
    family: 'falta de tiempo',
  };

  choose(value: string) {
    this.category.set(value);
    this.loading.set(true);
    this.gif.set('');

    this.excuseService.getExcuse(value).subscribe({
      next: data => {
        this.excuse.set(data[0].excuse);
        this.loading.set(false);
      },
      error: () => {
        this.excuse.set('No he podido inventar una excusa. Prueba otra vez.');
        this.loading.set(false);
      },
    });

    this.gifService.getGif(this.searches[value]).subscribe(url => {
      this.gif.set(url);
    });
  }
}