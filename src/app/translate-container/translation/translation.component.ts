import { Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorTranslateLight } from '@ng-icons/phosphor-icons/light';
import { DividerComponent } from '../../shared/divider/divider.component';
import { SpacerComponent } from '../../shared/spacer/spacer.component';
import { TitleComponent } from '../../shared/title/title.component';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss',
  imports: [TitleComponent, NgIcon, DividerComponent, SpacerComponent],
  viewProviders: [provideIcons({ phosphorTranslateLight })],
})
export class TranslationComponent {
  translated = input<string>();
  updatedHeight = input<number | undefined | null>();

  protected heightStyle = computed(() => {
    return this.updatedHeight() ? `height: ${this.updatedHeight()}px;` : '';
  });
}
