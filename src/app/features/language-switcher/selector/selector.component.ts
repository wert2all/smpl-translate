import { Component, computed, input, output, ViewChild } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import {
  phosphorArrowsLeftRightLight,
  phosphorXSquareLight,
} from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../../shared/components/buttons/icon-button/icon-button.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { SelectOption } from '../../../shared/shared.types';

@Component({
  selector: 'app-language-switcher-selector',
  templateUrl: './selector.component.html',
  imports: [IconButtonComponent, SelectComponent],
  viewProviders: [
    provideIcons({ phosphorArrowsLeftRightLight, phosphorXSquareLight }),
  ],
})
export class SelectorComponent {
  @ViewChild('from') from!: SelectComponent;
  @ViewChild('to') to!: SelectComponent;

  fromLanguagesOptions = input.required<SelectOption[]>();
  toLanguagesOptions = input.required<SelectOption[]>();
  isAllLanguages = input(false);

  switchLanguages = output();
  closeSelector = output();
  addOtherLanguages = output();
  selectFrom = output<SelectOption>();
  selectTo = output<SelectOption>();

  protected phosphorArrowsLeftRightLight = phosphorArrowsLeftRightLight;
  protected phosphorXSquareLight = phosphorXSquareLight;

  protected canAddOtherLanguages = computed(
    () => this.isAllLanguages() === false
  );

  setFocus(desctination: 'from' | 'to') {
    (desctination === 'from' ? this.from : this.to).setFocus();
  }
}
