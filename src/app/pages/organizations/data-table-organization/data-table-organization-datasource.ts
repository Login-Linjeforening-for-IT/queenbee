import { of } from 'rxjs';
import { BaseDataSource } from 'src/app/common/base-data-source';
import { OrgTableItem } from 'src/app/models/dataInterfaces.model';
import { OrganizationService } from 'src/app/services/api/organizations.service';
import { compare } from 'src/app/utils/core';

/**
 * Data source for the DataTableEvent view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableOrganizationDataSource extends BaseDataSource<OrgTableItem> {
  constructor(private orgService: OrganizationService) {
    super();
  }

  public fetchOrganizations() {
    this.orgService.fetchOrganizations().subscribe((orgs) => {
      this.updateData(orgs);
      this.refresh();
    });
  }

  override getItemId(item: OrgTableItem): string {
    return item.shortname;
  }
  
  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: OrgTableItem[]): OrgTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'shortname': return compare(a.shortname, b.shortname, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'link_homepage': return compare(a.link_homepage, b.link_homepage, isAsc);
        case 'updated_at': return compare(a.updated_at, b.updated_at, isAsc);
        case 'logo': return compare(a.logo, b.logo, isAsc);
        default: return 0;
      }
    });
  }
}
