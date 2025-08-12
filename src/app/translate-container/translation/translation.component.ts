import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorTranslateLight } from '@ng-icons/phosphor-icons/light';
import { TitleComponent } from '../../shared/title/title.component';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  imports: [TitleComponent, NgIcon],
  viewProviders: [provideIcons({ phosphorTranslateLight })],
})
export class TranslationComponent {}
