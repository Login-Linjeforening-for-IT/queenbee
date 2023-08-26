import { BaseDataSource } from 'src/app/common/base-data-source';
import { compare } from 'src/app/utils/core';
import { JobadService } from 'src/app/services/api/jobad.service';
import { JobadShort } from 'src/app/models/dataInterfaces.model';

/**
 * Data source for the DataTableJobads view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableJobadsDataSource extends BaseDataSource<JobadShort> {
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

  override getItemId(item: JobadShort): number {
    return item.id;
  }

  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: JobadShort[]): JobadShort[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'position_title_no': return compare(a.position_title_no, b.position_title_no, isAsc);
        case 'description_short_no': return compare(a.description_short_no, b.description_short_no, isAsc);
        
        default: return 0;
      }
    });
  }
}