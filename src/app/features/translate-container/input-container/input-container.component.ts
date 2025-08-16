import {
  AfterViewInit,
  Component,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  phosphorArrowCircleDownRightLight,
  phosphorArticleNyTimesLight,
} from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../../shared/components/buttons/icon-button/icon-button.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { TitleComponent } from '../../../shared/components/title/title.component';

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  imports: [
    TextareaComponent,
    IconButtonComponent,
    TitleComponent,
    NgIconComponent,
  ],
  viewProviders: [
    provideIcons({
      phosphorArrowCircleDownRightLight,
      phosphorArticleNyTimesLight,
    }),
  ],
})
export class InputContainerComponent implements AfterViewInit {
  @ViewChild(TextareaComponent) textarea!: TextareaComponent;

  inputString = input<string>();
  changeHeight = output<number>();
  unFocus = output<void>();
  typed = output<void>();

  phosphorArrowCircleDownRightLight = phosphorArrowCircleDownRightLight;
  phosphorArticleNyTimesLight = phosphorArticleNyTimesLight;

  ngAfterViewInit() {
    this.textarea.focus();
  }
}
