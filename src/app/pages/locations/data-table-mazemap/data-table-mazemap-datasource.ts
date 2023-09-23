import { BaseDataSource } from 'src/app/common/base-data-source';
import { LocationTableItem } from 'src/app/models/dataInterfaces.model';
import { LocationService } from 'src/app/services/api/location.service';
import { compare } from 'src/app/utils/core';

/**
 * Data source for the DataTableEvent view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableMazemapDataSource extends BaseDataSource<LocationTableItem> {
  constructor(private locationService: LocationService) {
    super();
  }

  public fetchLocations() {
    this.locationService.fetchLocations('mazemap').subscribe((locs) => {
      this.updateData(locs);
      this.refresh();
    });
  }

  override getItemId(item: LocationTableItem): number {
    return item.id;
  }

  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: LocationTableItem[]): LocationTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name_no': return compare(a.name, b.name, isAsc);
        case 'mazemap_campus_id': return compare(a.mazemap_campus_id, b.mazemap_campus_id, isAsc);
        case 'mazemap_poi_id': return compare(a.mazemap_poi_id, b.mazemap_poi_id, isAsc);
        case 'address_street': return compare(a.address_street, b.address_street, isAsc);
        case 'address_postcode': return compare(a.address_postcode, b.address_postcode, isAsc);
        case 'address_city': return compare(a.city_name, b.city_name, isAsc);
        case 'coordinate_lat': return compare(a.coordinate_lat, b.coordinate_lat, isAsc);
        case 'coordinate_long': return compare(a.coordinate_long, b.coordinate_long, isAsc);
        default: return 0;
      }
    });
  }
}
