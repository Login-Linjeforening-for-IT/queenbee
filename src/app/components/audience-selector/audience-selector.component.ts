import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Input, Output, ViewChild, inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { AudienceService } from 'src/app/services/admin-api/audience.service';
import { AudienceChip } from 'src/app/models/dataInterfaces.model';

@Component({
  selector: 'app-audience-selector',
  templateUrl: './audience-selector.component.html'
})

/**
 * The `AudienceSelectorComponent` is a component used for selecting multiple items from a list of options.
 * It provides a chip-like interface for selecting items.
 * 
 * @example
 * <app-chip-selector
 *   [title]="'Fruits'"
 *   [placeholder]="'Select items...'">
 * </app-chip-selector>
 */
export class AudienceSelectorComponent {
  @Input() title!: string;
  @Input() placeholder!: string;
  @Output() newAudienceSet = new EventEmitter<{as: number[]}>();

  @ViewChild('itemInput') itemInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl('');

  filteredItems: Observable<AudienceChip[]>;
  selectedItems: AudienceChip[] = [];
  chipItems!: AudienceChip[];

  announcer = inject(LiveAnnouncer);

  constructor(private audienceService: AudienceService) {
    this.fetchAudience();
    this.filteredItems = this.getFilteredItems();
  }

  /**
   * Function is used for removing chips from the set of selected chips
   * @param item AudienceChip to remove
   */
  remove(item: AudienceChip): void {
    const index = this.selectedItems.indexOf(item);

    if (index >= 0) {
      this.selectedItems.splice(index, 1);

      this.announcer.announce(`Removed ${item}`);
    }
    this.onAudeienceSetChange();
  }

  /**
   * Function handles selections from the input field
   * @param event MatAutocompleteSelectedEvent
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.push(event.option.value);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);

    // Reset the filteredItems Observable to include all items
    this.filteredItems = this.getFilteredItems();
    this.onAudeienceSetChange();
  }

  /**
   * Function returns an observable of AudienceChips
   * @returns Observable<AudienceChip[]>
   */
  getFilteredItems(): Observable<AudienceChip[]> {
    return this.itemCtrl.valueChanges.pipe(
       startWith(null),
       map((value: string | null) => (value ? this._filter(value) : this.chipItems.slice())),
    );
  }

  /**
   * Filters based on keyword and already selected items.
   * @param value search keyword
   * @returns AudienceChip[]
   */
  private _filter(value: string): AudienceChip[] {
    if (typeof value !== 'string') {
      // In case of non-string values; return an empty array.
      return [];
    }
    const filterValue = value.toLowerCase();
  
    // Filter based on filterValue, and remove already selected options
    const unselectedItems = this.chipItems.filter(item =>
      item.name.toLowerCase().includes(filterValue) && !this.selectedItems.includes(item)
    );
  
    return unselectedItems;
  }

  /**
   * Simply used to fetch all the audiences from the Admin API
   */
  private fetchAudience() {
    this.audienceService.fetchAudiences().subscribe((a: AudienceChip[]) => {
      this.chipItems = a;
    });
  }

  private onAudeienceSetChange() {
    const numberArray: number[] = [];
    this.selectedItems.map(item => numberArray.push(item.id));

    this.newAudienceSet.emit({as: numberArray});
  }
}
