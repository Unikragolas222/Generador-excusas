import { Component, signal, inject } from '@angular/core';
import { CategorySelector } from '../../components/category-selector/category-selector';
import { ExcuseCard } from '../../components/excuse-card/excuse-card';
import { ExcuseService } from '../../services/excuse';
import { GifService } from '../../services/gif';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [CategorySelector, ExcuseCard, RouterLink],
  templateUrl: './home.html',
})
export class Home {
  private excuseService = inject(ExcuseService);
  private gifService = inject(GifService);

  category = signal('');
  excuse = signal('');
  excuseId = signal<number | null>(null);
  gif = signal('');
  loading = signal(false);

  // Qué texto buscamos en GIPHY según la categoría
  private searches: Record<string, string> = {
    college: 'triste',
    office: 'cansado en el trabajo',
    party: 'lo siento',
    family: 'calla',
  };

  choose(value: string) {
    this.category.set(value);
    this.loading.set(true);
    this.gif.set('');
    this.excuseId.set(null);

    this.excuseService.getExcuse(value).subscribe({
      next: data => {
        this.excuse.set(data[0].excuse);
        this.excuseId.set(data[0].id);
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