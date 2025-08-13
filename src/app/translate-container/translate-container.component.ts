import { Component } from '@angular/core';
import { SpacerComponent } from '../shared/spacer/spacer.component';
import { TextareaComponent } from '../shared/textarea/textarea.component';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { TranslationComponent } from './translation/translation.component';

@Component({
  selector: 'app-translate-container',
  templateUrl: './translate-container.component.html',
  styleUrls: ['./translate-container.component.scss'],
  imports: [
    LanguageSwitcherComponent,
    BottomBarComponent,
    TranslationComponent,
    SpacerComponent,
    TextareaComponent,
    InputContainerComponent,
  ],
})
export class TranslateContainerComponent {}
