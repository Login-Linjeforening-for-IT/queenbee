import { BaseDataSource } from 'src/app/common/base-data-source';
import { compare } from 'src/app/utils/core';
import { JobadService } from 'src/app/services/admin-api/jobad.service';
import { JobadTableItem } from 'src/app/models/dataInterfaces.model';

/**
 * Data source for the DataTableJobads view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableJobadsDataSource extends BaseDataSource<JobadTableItem> {
  constructor(private jobadService: JobadService) {
    console.log("Constructing")
    super();
  }

  public fetchJobads() {
    this.jobadService.fetchJobads().subscribe((jobads) => {
      this.updateData(jobads);
      console.log(jobads);
      this.refresh();
    })
  }

  override getItemId(item: JobadTableItem): number {
    return item.id;
  }

  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: JobadTableItem[]): JobadTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        case 'position_title': return compare(a.position_title, b.position_title, isAsc);
        case 'job_type': return compare(a.job_type, b.job_type, isAsc);
        case 'time_publish': return compare(a.time_publish, b.time_publish, isAsc);
        case 'application_deadline': return compare(a.application_deadline, b.application_deadline, isAsc);
        case 'application_url': return compare(a.application_url, b.application_url, isAsc);
        case 'updated_at': return compare(a.updated_at, b.updated_at, isAsc);
        case 'visible': return compare(+a.visible, +b.visible, isAsc);
        case 'deleted_at': return compare(a.deleted_at, b.deleted_at, isAsc);
        case 'is_deleted': return compare(+a.is_deleted, +b.is_deleted, isAsc);
        case 'company_name': return compare(a.company_name, b.company_name, isAsc);
        default: return 0;
      }
    });
    
  }
}