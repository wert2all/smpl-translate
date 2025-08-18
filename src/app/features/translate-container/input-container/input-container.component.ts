import {
  AfterViewInit,
  Component,
  computed,
  effect,
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
  styleUrl: './input-container.component.scss',
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
  @ViewChild(TextareaComponent) textarea: TextareaComponent | null = null;

  inputString = input<string>();
  setInputMode = input<boolean>(false);

  changeHeight = output<number>();
  activateInputMode = output();
  translate = output();

  protected phosphorArrowCircleDownRightLight =
    phosphorArrowCircleDownRightLight;
  protected phosphorArticleNyTimesLight = phosphorArticleNyTimesLight;

  protected isDisabledInput = computed(() => !this.setInputMode());

  ngAfterViewInit() {
    this.textarea?.focus();
  }

  constructor() {
    effect(() => {
      const isInputMode = !this.isDisabledInput();
      if (isInputMode) {
        this.textarea?.focus();
      }
    });
  }
}
