import {
  AfterViewInit,
  Component,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorArrowCircleDownRightLight } from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../shared/buttons/icon-button/icon-button.component';
import { TextareaComponent } from '../../shared/textarea/textarea.component';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  imports: [TextareaComponent, IconButtonComponent],
  viewProviders: [provideIcons({ phosphorArrowCircleDownRightLight })],
})
export class InputContainerComponent implements AfterViewInit {
  @ViewChild(TextareaComponent) textarea!: TextareaComponent;

  inputString = input<string>();
  changeHeight = output<number>();

  ngAfterViewInit() {
    this.textarea.focus();
  }
}
