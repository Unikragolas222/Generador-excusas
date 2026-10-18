import { Component, OnInit, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ExcuseCard } from '../../components/excuse-card/excuse-card';
import { ExcuseService } from '../../services/excuse';

@Component({
  selector: 'app-detail',
  imports: [ExcuseCard, RouterLink],
  templateUrl: './detail.html',
})
export class Detail implements OnInit {
  private excuseService = inject(ExcuseService);

  // Llega desde la URL (/excuse/:id) gracias a withComponentInputBinding()
  id = input.required<string>();

  excuse = signal('');
  loading = signal(true);

    ngOnInit() {
    this.excuseService.getExcuseById(this.id()).subscribe({
      next: data => {
        // Si llega una lista cogemos el primero, si llega un objeto lo usamos tal cual
        const item = Array.isArray(data) ? data[0] : data;
        this.excuse.set(item?.excuse ?? 'No hemos encontrado esa excusa.');
        this.loading.set(false);
      },
      error: err => {
        console.error(err);
        this.excuse.set('No hemos encontrado esa excusa.');
        this.loading.set(false);
      },
    });
  }
}