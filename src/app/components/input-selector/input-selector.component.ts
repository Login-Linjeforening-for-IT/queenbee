import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, inject, Input} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-input-selector',
  templateUrl: './input-selector.component.html'
})
export class InputSelectorComponent {
  @Input() label!: string;
  @Input() inputPlaceholder!: string;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  chips: string[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our chip
    if (value && !this.inChips(value)) {
      //const uppercasedValue = value[0].toUpperCase() + value.slice(1);
      this.chips.push(value[0].toUpperCase() + value.slice(1));
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(chip: string): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);

      this.announcer.announce(`Removed ${chip}`);
    }
  }

  edit(chip: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove chip if it no longer has a name
    if (!value) {
      this.remove(chip);
      return;
    }

    // Edit existing chip
    const index = this.chips.indexOf(chip);
    if (index >= 0) {
      this.chips[index] = value;
    }
  }

  getChips(): string[] {
    return this.chips;
  }

  private inChips(value: string): boolean {
    let found = false;

    this.chips.map(chip => {
      if (value.toLowerCase() === chip.toLowerCase()) {
        found = true;
      }
    })
    return found;
  }
}
