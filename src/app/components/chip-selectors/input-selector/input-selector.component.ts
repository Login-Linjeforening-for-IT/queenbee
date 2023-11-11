import {Component} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { BaseChipSelectorComponent } from '../base-chip-selector/base-chip-selector.component';

@Component({
  selector: 'app-input-selector',
  templateUrl: './input-selector.component.html'
})
export class InputSelectorComponent extends BaseChipSelectorComponent{
  addOnBlur = true;

  constructor() {
    super();
    this.updateChips();
  }

  ngOnChanges() {
    this.updateChips();
  }

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
