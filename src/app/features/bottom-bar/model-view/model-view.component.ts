import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bottom-model-view',
  templateUrl: './model-view.component.html',
  styleUrl: './model-view.component.scss',
})
export class BottomModelView {
  provider = input.required<string>();
  model = input.required<string>();
}
