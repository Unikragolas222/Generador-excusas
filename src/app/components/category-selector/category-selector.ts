import { Component, input, output } from '@angular/core';

interface Categoria {
  valor: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.html',
})
export class CategorySelector {
  categorias: Categoria[] = [
    { valor: 'college', name: 'Universidad', icon: '🎓' },
    { valor: 'office', name: 'Trabajo', icon: '💼' },
    { valor: 'party', name: 'Social', icon: '🎉' },
    { valor: 'family', name: 'Familia', icon: '🏠' },
  ];

  // Entra desde fuera: la categoría que está seleccionada ahora
  activa = input<string>('');

  // Sale hacia fuera: avisa de la categoría pulsada
  elegida = output<string>();
}