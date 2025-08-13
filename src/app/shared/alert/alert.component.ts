import { Component, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorWarningCircleLight } from '@ng-icons/phosphor-icons/light';

@Component({
  selector: 'app-shared-alert',
  imports: [],
  viewProviders: [provideIcons({ phosphorWarningCircleLight })],
  template: `<div class="alert flex place-items-center border-1 p-4">
    <span></span>
    {{ message() }}
  </div>`,
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  message = input.required<string>();
}
