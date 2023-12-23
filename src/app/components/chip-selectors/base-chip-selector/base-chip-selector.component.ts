import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-base-chip-selector',
  templateUrl: './base-chip-selector.component.html'
})
export abstract class BaseChipSelectorComponent {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() values!: any[];

  @Output() newChipSet = new EventEmitter<{as: any[]}>();

  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;

  itemCtrl = new FormControl('');
  filteredItems: Observable<any[]>;
  chipItems!: any[];

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  chips: any[] = [];

  announcer = inject(LiveAnnouncer);

  constructor() {
    this.filteredItems = this.getFilteredItems();
  }

  //updateChips() {}

  /**
   * Function handles selections from the input field
   * @param event MatAutocompleteSelectedEvent
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.chips.push(event.option.value);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);

    // Reset the filteredItems Observable to include all items
    this.filteredItems = this.getFilteredItems();
    this.onChipSetChange();
  }

  remove(chip: any): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);

      this.announcer.announce(`Removed ${chip}`);
    }
    this.onChipSetChange();
  }

  getChips(): any[] {
    return this.chips;
  }

  /**
   * Function returns an observable of AudienceChips
   * @returns Observable<AudienceChip[]>
   */
  getFilteredItems(): Observable<any[]> {
    return this.itemCtrl.valueChanges.pipe(
       startWith(null),
       map((value: string | null) => (value ? this._filter(value) : this.chipItems.slice())),
    );
  }

  updateChips() {
    if (this.values && this.values.length > 0) {
      this.chips = [...this.values];
    } else {
      this.chips = [];
    }
  }

  /**
   * Filters based on keyword and already selected items.
   * @param value search keyword
   * @returns AudienceChip[]
   */
  private _filter(value: string): any[] {
    if (typeof value !== 'string') {
      // In case of non-string values; return an empty array.
      return [];
    }
    const filterValue = value.toLowerCase();
  
    // Filter based on filterValue, and remove already selected options
    const unselectedItems = this.chipItems.filter(item =>
      item.name.toLowerCase().includes(filterValue) && !this.chips.includes(item)
    );
  
    return unselectedItems;
  }

  private onChipSetChange() {
    const chipArray: any[] = [];
    this.chips.map(item => chipArray.push(item.id));

    this.newChipSet.emit({as: chipArray});
  }
}
