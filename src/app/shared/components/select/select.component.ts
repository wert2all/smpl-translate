import {
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
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
  toggleOption = output<SelectOption>();

  protected selectedOptions = computed(() => {
    return this.options().filter(option => option.isSelected);
  });
  protected focusedIndex = signal<number | null>(null);

  protected withIcons = computed(
    () => this.options().filter(option => option.icon).length > 0
  );

  protected onKeyDown(event: KeyboardEvent): void {
    const optionsLength = this.options().length;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex.update(focusedIndex => {
          if (!focusedIndex) focusedIndex = 0;
          return (focusedIndex + 1) % optionsLength;
        });
        this.scrollToFocusedOption();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex.update(focusedIndex => {
          if (!focusedIndex) focusedIndex = 0;
          return focusedIndex === 0 ? optionsLength - 1 : focusedIndex - 1;
        });
        this.scrollToFocusedOption();
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        if (optionsLength > 0) {
          this.toggleOption.emit(this.options()[this.focusedIndex() || 0]);
        }
        break;

      case 'Home':
        event.preventDefault();
        this.focusedIndex.set(0);
        this.scrollToFocusedOption();
        break;

      case 'End':
        event.preventDefault();
        this.focusedIndex.set(optionsLength - 1);
        this.scrollToFocusedOption();
        break;
    }
  }

  selectOption(option: SelectOption, index: number): void {
    this.focusedIndex.set(index);
    this.toggleOption.emit(option);
  }

  isSelected(option: SelectOption): boolean {
    return this.selectedOptions().some(
      selected => selected.value === option.value
    );
  }

  private scrollToFocusedOption(): void {
    // Optional: Auto-scroll to keep focused option visible
    setTimeout(() => {
      const focusedElement = this.container?.nativeElement.children[
        this.focusedIndex() || 0
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
