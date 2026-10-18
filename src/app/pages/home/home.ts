import { Component, signal, inject } from '@angular/core';
import { CategorySelector } from '../../components/category-selector/category-selector';
import { ExcuseCard } from '../../components/excuse-card/excuse-card';
import { ExcuseService } from '../../services/excuse';
import { GifService } from '../../services/gif';

@Component({
  selector: 'app-home',
  imports: [CategorySelector, ExcuseCard],
  templateUrl: './home.html',
})
export class Home {
  private excuseService = inject(ExcuseService);
  private gifService = inject(GifService);

  category = signal('');
  excuse = signal('');
  gif = signal('');
  loading = signal(false);

  // Qué texto buscamos en GIPHY según la categoría
  private searches: Record<string, string> = {
    college: 'tired student',
    office: 'tired at work',
    party: 'party excuse',
    family: 'family dinner',
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