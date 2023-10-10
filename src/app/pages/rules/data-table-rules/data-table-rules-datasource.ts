import { BaseDataSource } from 'src/app/common/base-data-source';
import { LocationTableItem, RulesTableItem } from 'src/app/models/dataInterfaces.model';
import { LocationService } from 'src/app/services/admin-api/location.service';
import { RulesService } from 'src/app/services/admin-api/rules.service';
import { compare } from 'src/app/utils/core';

/**
 * Data source for the DataTableEvent view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableRulesDataSource extends BaseDataSource<RulesTableItem> {
  constructor(private rulesService: RulesService) {
    super();
  }

  public fetchRules() {
    this.rulesService.fetchRules().subscribe((rules) => {
      this.updateData(rules);
      this.refresh();
    });
  }

  override getItemId(item: RulesTableItem): number {
    return item.id;
  }

  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: RulesTableItem[]): RulesTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name_no': return compare(a.name_no, b.name_no, isAsc);
        case 'name_en': return compare(a.name_en, b.name_en, isAsc);
        default: return 0;
      }
    });
  }
}
