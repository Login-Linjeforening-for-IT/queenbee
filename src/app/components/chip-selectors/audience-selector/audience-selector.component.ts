import {Component} from '@angular/core';
import { AudienceService } from 'src/app/services/admin-api/audience.service';
import { AudienceChip } from 'src/app/models/dataInterfaces.model';
import { BaseChipSelectorComponent } from '../base-chip-selector/base-chip-selector.component';

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
export class AudienceSelectorComponent extends BaseChipSelectorComponent {
  constructor(private audienceService: AudienceService) {
    super();
    this.fetchAudience();
  }

  /**
   * Simply used to fetch all the audiences from the Admin API
   */
  private fetchAudience() {
    this.audienceService.fetchAudiences().subscribe((a: AudienceChip[]) => {
      this.chipItems = a;
    });
  }
}
