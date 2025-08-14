import { Component, input } from '@angular/core';
import { Mode } from '../../../shared/shared.types';

@Component({
  selector: 'app-translate-mode',
  template: `<span class="rounded px-2 py-1">{{
    mode().toUpperCase().charAt(0)
  }}</span>`,
  styleUrl: './mode.component.scss',
})
export class ModeComponent {
  mode = input.required<Mode>();
}
