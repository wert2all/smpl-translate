import { Component, computed, input, output } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { phosphorArrowsLeftRightLight } from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../../shared/components/buttons/icon-button/icon-button.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { SelectOption } from '../../../shared/shared.types';

@Component({
  selector: 'app-language-switcher-selector',
  templateUrl: './selector.component.html',
  imports: [IconButtonComponent, SelectComponent],
  viewProviders: [provideIcons({ phosphorArrowsLeftRightLight })],
})
export class SelectorComponent {
  fromLanguagesOptions = input.required<SelectOption[]>();
  toLanguagesOptions = input.required<SelectOption[]>();
  isAllLanguages = input(false);

  switchLanguages = output();
  addOtherLanguages = output();

  protected canAddOtherLanguages = computed(
    () => this.isAllLanguages() === false
  );
}
