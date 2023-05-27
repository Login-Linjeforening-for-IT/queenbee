import { BehaviorSubject, of } from 'rxjs';
import { BaseDataSource } from 'src/app/common/base-data-source';
import { compare } from 'src/app/common/utils';

import { EventService } from 'src/app/services/api/event.service';
import { EventData } from 'src/app/models/event-data.model';

/**
 * Data source for the DataTableEvent view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableEventDataSource extends BaseDataSource<EventData> {
  private eventsService!: EventService;

  constructor(private eventService: EventService) {
    super();
  }

  public fetchEvents() {
    this.eventService.fetchEvents().subscribe((events) => {
      this.updateData(events);
      this.refresh();
    });
  }

  override getItemId(item: EventData): number {
    return item.id;
  }

  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: EventData[]): EventData[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name_no': return compare(a.name_no, b.name_no, isAsc);
        case 'time_start': return compare(a.time_start, b.time_start, isAsc);
        case 'time_end': return compare(a.time_end, b.time_end, isAsc);
        case 'time_publish': return compare(a.time_publish, b.time_publish, isAsc);
        case 'time_signup_deadline': return compare(a.time_signup_deadline, b.time_signup_deadline, isAsc);
        case 'time_signup_release': return compare(a.time_signup_release, b.time_signup_release, isAsc);
        case 'created_at': return compare(a.created_at, b.created_at, isAsc);
        case 'canceled': return compare(+a.canceled, +b.canceled, isAsc);
        case 'full': return compare(+a.full, +b.full, isAsc);
        case 'capacity': return compare(+a.capacity, +b.capacity, isAsc);
        case 'category': return compare(a.category.name_no, b.category.name_no, isAsc);
        case 'location': return compare(a.location?.name, b.location?.name, isAsc);
        default: return 0;
      }
    });
  }
}