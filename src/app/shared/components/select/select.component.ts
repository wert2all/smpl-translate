import {
  Component,
  computed,
  ElementRef,
  input,
  ViewChild,
} from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { phosphorCheckLight } from '@ng-icons/phosphor-icons/light';
import { SelectOption } from '../../shared.types';

@Component({
  selector: 'app-shared-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ phosphorCheckLight })],
})
export class SelectComponent {
  @ViewChild('dropdownContainer') container!: ElementRef<HTMLElement>;

  options = input.required<SelectOption[]>();
  isMultible = input(false);

  protected selectedOptions: SelectOption[] = [];
  protected focusedIndex = 0;

  protected withIcons = computed(
    () => this.options().filter(option => option.icon).length > 0
  );

  protected onKeyDown(event: KeyboardEvent): void {
    const optionsLength = this.options().length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex = (this.focusedIndex + 1) % optionsLength;
        this.scrollToFocusedOption();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex =
          this.focusedIndex === 0 ? optionsLength - 1 : this.focusedIndex - 1;
        this.scrollToFocusedOption();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (optionsLength > 0) {
          this.toggleOption(this.options()[this.focusedIndex]);
        }
        break;

      case 'Home':
        event.preventDefault();
        this.focusedIndex = 0;
        this.scrollToFocusedOption();
        break;

      case 'End':
        event.preventDefault();
        this.focusedIndex = optionsLength - 1;
        this.scrollToFocusedOption();
        break;
    }
  }

  selectOption(option: SelectOption, index: number): void {
    this.focusedIndex = index;
    this.toggleOption(option);
  }

  toggleOption(option: SelectOption): void {
    const index = this.selectedOptions.findIndex(
      selected => selected.value === option.value
    );

    if (index > -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
    }
  }

  isSelected(option: SelectOption): boolean {
    return this.selectedOptions.some(
      selected => selected.value === option.value
    );
  }

  private scrollToFocusedOption(): void {
    // Optional: Auto-scroll to keep focused option visible
    setTimeout(() => {
      const focusedElement = this.container?.nativeElement.children[
        this.focusedIndex
      ] as HTMLElement;

      if (focusedElement) {
        const containerRect =
          this.container.nativeElement.getBoundingClientRect();
        const elementRect = focusedElement.getBoundingClientRect();

        if (elementRect.bottom > containerRect.bottom) {
          focusedElement.scrollIntoView({ block: 'end', behavior: 'smooth' });
        } else if (elementRect.top < containerRect.top) {
          focusedElement.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }
    });
  }
}
