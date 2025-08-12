import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { flagGbSquare, flagUaSquare } from '@ng-icons/flag-icons/square';
import { phosphorArrowsLeftRightLight } from '@ng-icons/phosphor-icons/light';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  imports: [NgIconComponent],
  viewProviders: [
    provideIcons({ phosphorArrowsLeftRightLight, flagUaSquare, flagGbSquare }),
  ],
})
export class LanguageSwitcherComponent { }
