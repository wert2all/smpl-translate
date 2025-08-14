import { Component, computed, input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorWarningCircleLight } from '@ng-icons/phosphor-icons/light';

@Component({
  selector: 'app-shared-alert',
  imports: [],
  viewProviders: [provideIcons({ phosphorWarningCircleLight })],
  template: `<div
    [class.error]="isError()"
    [class.success]="isSuccess()"
    class="alert flex place-items-center border-1 p-4">
    <span></span>
    {{ message() }}
  </div>`,
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  type = input.required<'error' | 'success'>();
  message = input.required<string>();

  protected isError = computed(() => this.type() === 'error');
  protected isSuccess = computed(() => this.type() === 'success');
}
