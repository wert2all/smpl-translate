import { Component, input } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  imports: [NgIconComponent],
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  icon = input.required<string>();
}
