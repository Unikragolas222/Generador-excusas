import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

// Solo describimos la parte del JSON de GIPHY que nos interesa
interface GiphyResponse {
  data: { images: { original: { url: string } } }[];
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);
  private url = 'https://api.giphy.com/v1/gifs/search';

  // Busca un GIF a partir de un texto y devuelve directamente su URL
  getGif(query: string): Observable<string> {
    // Un punto de partida al azar para que no salga siempre el mismo GIF
    const offset = Math.floor(Math.random() * 20);

    const request =
      `${this.url}?api_key=${environment.giphyApiKey}` +
      `&q=${encodeURIComponent(query)}&limit=1&offset=${offset}&rating=g`;

    return this.http.get<GiphyResponse>(request).pipe(
      map(response => response.data[0]?.images.original.url ?? '')
    );
  }
}