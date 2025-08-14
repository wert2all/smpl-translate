import { Component, input } from '@angular/core';

@Component({
  selector: 'app-shared-kbd',
  template: `<kbd class="rounded px-2 py-1">{{ key() }}</kbd>`,
  styleUrl: './kbd.component.scss',
})
export class KbdComponent {
  key = input.required<string>();
}
