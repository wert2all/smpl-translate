import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorClipboardTextLight,
  phosphorTranslateLight,
} from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../../shared/components/buttons/icon-button/icon-button.component';
import { DividerComponent } from '../../../shared/components/divider/divider.component';
import { SpacerComponent } from '../../../shared/components/spacer/spacer.component';
import { TitleComponent } from '../../../shared/components/title/title.component';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss',
  imports: [
    TitleComponent,
    NgIcon,
    DividerComponent,
    SpacerComponent,
    IconButtonComponent,
  ],
  viewProviders: [
    provideIcons({ phosphorTranslateLight, phosphorClipboardTextLight }),
  ],
})
export class TranslationComponent {
  translated = input<string>();
  updatedHeight = input<number | undefined | null>();

  protected heightStyle = computed(() => {
    return this.updatedHeight() ? `height: ${this.updatedHeight()}px;` : '';
  });
}
