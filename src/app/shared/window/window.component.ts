import { Component } from '@angular/core';
import { ButtonComponent } from '../buttons/button/button.component';

@Component({
  selector: 'app-shared-window',
  templateUrl: './window.component.html',
  imports: [ButtonComponent],
})
export class WindowComponent {}
