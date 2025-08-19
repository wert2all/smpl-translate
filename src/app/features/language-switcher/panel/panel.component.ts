import { Component, input, output } from '@angular/core';
import {
  phosphorAlienLight,
  phosphorArrowsLeftRightLight,
} from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../../shared/components/buttons/icon-button/icon-button.component';

interface View {
  title: string;
  icon: string | undefined;
}

@Component({
  selector: 'app-language-switcher-panel',
  templateUrl: './panel.component.html',
  imports: [IconButtonComponent],
})
export class PanelComponent {
  from = input.required<View>();
  to = input.required<View>();

  switchLanguage = output();
  changeFrom = output();
  changeTo = output();

  protected phosphorArrowsLeftRightLight = phosphorArrowsLeftRightLight;
  protected phosphorAlienLight = phosphorAlienLight;
}
