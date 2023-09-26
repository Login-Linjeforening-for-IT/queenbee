import { BaseDataSource } from 'src/app/common/base-data-source';
import { compare } from 'src/app/utils/core';

import { EventService } from 'src/app/services/api/event.service';
import { EventTableItem } from 'src/app/models/dataInterfaces.model';

/**
 * Data source for the DataTableEvent view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableEventDataSource extends BaseDataSource<EventTableItem> {
  constructor(private eventService: EventService) {
    super();
  }

  public fetchEvents() {
    this.eventService.fetchEvents().subscribe((events) => {
      this.updateData(events);
      this.refresh();
    });
  }

  override getItemId(item: EventTableItem): number {
    return item.id;
  }

  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: EventTableItem[]): EventTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name_no': return compare(a.name, b.name, isAsc);
        case 'time_start': return compare(a.time_start, b.time_start, isAsc);
        case 'time_end': return compare(a.time_end, b.time_end, isAsc);
        case 'time_publish': return compare(a.time_publish, b.time_publish, isAsc);
        case 'canceled': return compare(+a.canceled, +b.canceled, isAsc);
        case 'full': return compare(+a.full, +b.full, isAsc);
        case 'capacity': return compare(+a.capacity, +b.capacity, isAsc);
        case 'category_name': return compare(a.category_name, b.category_name, isAsc);
        case 'location_name': return compare(a.location_name, b.location_name, isAsc);
        case 'updated_at': return compare(a.updated_at, b.updated_at, isAsc);
        case 'time_type': return compare(a.time_type, b.time_type, isAsc);
        default: return 0;
      }
    });
  }
}