import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, inject, Input} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {NgFor} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-skills-selector',
  templateUrl: './skills-selector.component.html',
  styleUrls: ['./skills-selector.component.css']
})
export class SkillsSelectorComponent {
  @Input() label!: string;
  @Input() inputPlaceholder!: string;

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  chips: any[] = [];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our obj
    if (value && !this.inChips(value)) {
      //const uppercasedValue = value[0].toUpperCase() + value.slice(1);
      this.chips.push({name: value[0].toUpperCase() + value.slice(1)});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: any): void {
    const index = this.chips.indexOf(fruit);

    if (index >= 0) {
      this.chips.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  edit(obj: any, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove obj if it no longer has a name
    if (!value) {
      this.remove(obj);
      return;
    }

    // Edit existing obj
    const index = this.chips.indexOf(obj);
    if (index >= 0) {
      this.chips[index].name = value;
    }
  }

  getChips(): any {
    return this.chips;
  }

  private inChips(value: any): boolean {
    let found = false;

    this.chips.map(chip => {
      console.log(chip, chip.name, value)
      if (value.toLowerCase() === chip.name.toLowerCase()) {
        found = true;
      }
    })
    return found;
  }
}
