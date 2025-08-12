import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import { phosphorArrowsLeftRightLight } from '@ng-icons/phosphor-icons/light';
import { IconButtonComponent } from '../../shared/buttons/icon-button/icon-button.component';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  imports: [NgIconComponent, IconButtonComponent],
  viewProviders: [
    provideIcons({ phosphorArrowsLeftRightLight, flagUaSquare, flagGbSquare }),
  ],
})
export class LanguageSwitcherComponent {}
