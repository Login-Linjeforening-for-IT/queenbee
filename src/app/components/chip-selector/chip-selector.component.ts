import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, Input, ViewChild, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-chip-selector',
  templateUrl: './chip-selector.component.html',
  styleUrls: ['./chip-selector.component.css']
})

/**
 * The `ChipSelectorComponent` is a component used for selecting multiple items from a list of options.
 * It provides a chip-like interface for selecting items.
 * 
 * @example
 * <app-chip-selector
 *   [title]="'Fruits'"
 *   [placeholder]="'Select items...'"
 *   [chipItems]="['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry']"
 *   [selectedItems]="['Lemon']">
 * </app-chip-selector>
 */
export class ChipSelectorComponent {
  @Input() title!: string;
  @Input() placeholder!: string;
  @Input() chipItems: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  @Input() selectedItems: string[] = ['Lemon'];

  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl('');
  filteredItems: Observable<string[]>;

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => (item ? this._filter(item) : this.chipItems.slice())),
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our item
    if (value) {
      this.selectedItems.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.itemCtrl.setValue(null);
  }

  remove(item: string): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);

      this.announcer.announce(`Removed ${item}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.chipItems.filter(item => item.toLowerCase().includes(filterValue));
  }
}
