import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Cómo es cada excusa que devuelve la API
export interface Excuse {
  id: number;
  excuse: string;
  category: string;
}

@Injectable({ providedIn: 'root' })
export class ExcuseService {
  private http = inject(HttpClient);
  private url = 'https://excuser-three.vercel.app/v1/excuse';

  // Pide una excusa de la categoría indicada (college, office, party, family)
  getExcuse(category: string): Observable<Excuse[]> {
    return this.http.get<Excuse[]>(`${this.url}/${category}/`);
  }
    // Pide una excusa concreta por su id
  getExcuseById(id: string): Observable<Excuse | Excuse[]> {
    return this.http.get<Excuse | Excuse[]>(`${this.url}/id/${id}/`);
  }
}