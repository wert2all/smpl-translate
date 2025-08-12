import { Component } from '@angular/core';
import { BottomBarComponent } from './bottom-bar/bottom-bar.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';

@Component({
  selector: 'app-translate-container',
  templateUrl: './translate-container.component.html',
  styleUrls: ['./translate-container.component.scss'],
  imports: [LanguageSwitcherComponent, BottomBarComponent],
})
export class TranslateContainerComponent {}
