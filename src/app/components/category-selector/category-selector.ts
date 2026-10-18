import { Component, input, output } from '@angular/core';

interface Category {
  value: string; // lo que espera la API
  name: string;  // lo que ve el usuario
  icon: string;
}

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.html',
})
export class CategorySelector {
  categories: Category[] = [
    { value: 'college', name: 'Universidad', icon: '🎓' },
    { value: 'office', name: 'Trabajo', icon: '💼' },
    { value: 'party', name: 'Social', icon: '🎉' },
    { value: 'family', name: 'Familia', icon: '🏠' },
  ];

  // Entra desde fuera: la categoría que está seleccionada ahora
  active = input<string>('');

  // Sale hacia fuera: avisa de la categoría pulsada
  chosen = output<string>();
}