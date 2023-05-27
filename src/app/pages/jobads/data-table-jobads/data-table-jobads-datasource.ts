import { JobadsConstants } from '../../pages.constants';
import { BaseDataSource } from 'src/app/common/base-data-source';
import { compare } from 'src/app/common/utils';
import { of } from 'rxjs';

// Interface for the data expected in a Job ad.
export interface DataTableJobadsItem {
  id: number;
  title_no: string;
  title_en: string;
  position_title_no: string;
  position_title_en: string;
  description_short_no: string;
  description_short_en: string;
  description_long_no: string;
  description_long_en: string;
  time_publish: string;
  time_deadline: string;
  time_updated: string;
  application_url: string;
  application_email: string;
  contact_email: string;
  contact_phone: string;
  image_small: string;
  image_banner: string;
  remote: boolean;
  type: string;
  priority: number;
}

/**
 * Data source for the DataTableJobads view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableJobadsDataSource extends BaseDataSource<DataTableJobadsItem> {
  constructor() {
    super();
    this.data.next(EXAMPLE_DATA);
  }

  override getItemId(item: DataTableJobadsItem): number {
    return item.id;
  }

  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: DataTableJobadsItem[]): DataTableJobadsItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'title_no': return compare(a.title_no, b.title_no, isAsc);
        case 'position_title_no': return compare(a.position_title_no, b.position_title_no, isAsc);
        case 'description_short_no': return compare(a.description_short_no, b.description_short_no, isAsc);
        case 'time_publish': return compare(a.time_publish, b.time_publish, isAsc);
        case 'time_deadline': return compare(a.time_deadline, b.time_deadline, isAsc);
        case 'time_updated': return compare(a.time_updated, b.time_updated, isAsc);
        case 'application_url': return compare(a.application_url, b.application_url, isAsc);
        case 'application_email': return compare(a.application_email, b.application_email, isAsc);
        case 'contact_email': return compare(a.contact_email, b.contact_email, isAsc);
        case 'contact_phone': return compare(a.contact_phone, b.contact_phone, isAsc);
        case 'image_small': return compare(a.image_small, b.image_small, isAsc);
        case 'image_banner': return compare(a.image_banner, b.image_banner, isAsc);
        case 'application_url': return compare(a.application_url, b.application_url, isAsc);
        case 'remote': return compare(+a.remote, +b.remote, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'priority': return compare(a.priority, b.priority, isAsc);
        default: return 0;
      }
    });
  }
}

const EXAMPLE_DATA: DataTableJobadsItem[] = JobadsConstants.DUMMY_DATA