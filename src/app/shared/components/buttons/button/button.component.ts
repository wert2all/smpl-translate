import { Component, input, output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-shared-button',
  template: `<button
    class="p-4"
    (click)="fired.emit()"
    [class.primary]="isPrimary()">
    <span class="flex items-center">
      @if (icon(); as icon) {
        <ng-icon [svg]="icon" /> <span class="me-2"></span>
      }
      {{ title() }}
    </span>
  </button>`,
  styleUrl: './button.component.scss',
  imports: [NgIcon],
})
export class ButtonComponent {
  title = input.required<string>();
  icon = input<string>();
  isPrimary = input(false);

  fired = output();
}
