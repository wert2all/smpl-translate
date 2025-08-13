import { Component, input } from '@angular/core';
import { KbdComponent } from '../../shared/kbd/kbd.component';
import { Mode } from '../../shared/shared.types';
import { ModeComponent } from '../mode/mode.component';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  imports: [KbdComponent, ModeComponent],
})
export class BottomBarComponent {
  mode = input.required<Mode>();
}
