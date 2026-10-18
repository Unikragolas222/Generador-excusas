import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Cómo es cada excusa que devuelve la API
export interface Excusa {
  id: number;
  excuse: string;
  category: string;
}

@Injectable({ providedIn: 'root' })
export class ExcusaService {
  private http = inject(HttpClient);
  private url = 'https://excuser-three.vercel.app/v1/excuse';

  // Pide una excusa de la categoría indicada (college, office, party, family)
  getExcusa(categoria: string): Observable<Excusa[]> {
    return this.http.get<Excusa[]>(`${this.url}/${categoria}/`);
  }
}