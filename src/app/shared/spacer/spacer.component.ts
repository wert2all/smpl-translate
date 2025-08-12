import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-shared-spacer',
  template: `<div [style]="height()"></div>`,
})
export class SpacerComponent {
  multiplexor = input<string>('1');
  protected height = computed(
    () => 'height: ' + Number(this.multiplexor()) * 0.5 + 'rem'
  );
}
