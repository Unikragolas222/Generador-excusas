import { Component, input } from '@angular/core';

@Component({
  selector: 'app-excuse-card',
  templateUrl: './excuse-card.html',
})
export class ExcuseCard {
  excuse = input<string>('');
  gif = input<string>('');
  loading = input<boolean>(false);
}