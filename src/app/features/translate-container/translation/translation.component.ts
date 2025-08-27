import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorClipboardTextLight,
  phosphorTranslateLight,
} from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../../shared/components/buttons/icon-button/icon-button.component';
import { DividerComponent } from '../../../shared/components/divider/divider.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { TitleComponent } from '../../../shared/components/title/title.component';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss',
  imports: [
    TitleComponent,
    NgIcon,
    DividerComponent,
    IconButtonComponent,
    LoaderComponent,
  ],
  viewProviders: [
    provideIcons({ phosphorTranslateLight, phosphorClipboardTextLight }),
  ],
})
export class TranslationComponent {
  isLoading = input.required<boolean>();

  translated = input<string | null | undefined>();
  updatedHeight = input<number | undefined | null>();
  phosphorClipboardTextLight = phosphorClipboardTextLight;

  protected isDisabled = computed(
    () => !this.translated() || this.translated() == '' || this.isLoading()
  );

  protected heightStyle = computed(
    () => `height: ${this.updatedHeight() || 200}px;`
  );
}
