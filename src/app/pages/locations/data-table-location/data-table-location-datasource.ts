import { of } from 'rxjs';
import { BaseDataSource } from 'src/app/common/base-data-source';
import { compare } from 'src/app/utils/core';

// Interface for the data expected in an event.
export interface DataTableLocationItem {
  id: number;
  name_no: string;
  name_en: string;
  type: string;
  mazemap_campus_id: string;
  mazemap_poi_id: string;
  address_street: string;
  address_postcode: string;
  address_city: string;
  coordinate_lat: string;
  coordinate_long: string;
}

/**
 * Data source for the DataTableEvent view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableLocationDataSource extends BaseDataSource<DataTableLocationItem> {
  constructor() {
    super();
    this.data.next(EXAMPLE_DATA);
  }

  override getItemId(item: DataTableLocationItem): number {
    return item.id;
  }

  /**
   * Sort the data (client-side).
   */
  override getSortedData(data: DataTableLocationItem[]): DataTableLocationItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'name_no': return compare(a.name_no, b.name_no, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        case 'mazemap_campus_id': return compare(a.mazemap_campus_id, b.mazemap_campus_id, isAsc);
        case 'mazemap_poi_id': return compare(a.mazemap_poi_id, b.mazemap_poi_id, isAsc);
        case 'address_street': return compare(a.address_street, b.address_street, isAsc);
        case 'address_postcode': return compare(a.address_postcode, b.address_postcode, isAsc);
        case 'address_city': return compare(a.address_city, b.address_city, isAsc);
        case 'coordinate_lat': return compare(a.coordinate_lat, b.coordinate_lat, isAsc);
        case 'coordinate_long': return compare(a.coordinate_long, b.coordinate_long, isAsc);
        default: return 0;
      }
    });
  }
}


// Many hundred lines of dummy data below
// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableLocationItem[] = [
  {
    "id": 1,
    "name_no": "Navnet mitt",
    "name_en": "My name",
    "type": "building",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67890",
    "address_street": "123 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.911168",
    "coordinate_long": "10.744895"
  },
  {
    "id": 2,
    "name_no": "Fellesbygget",
    "name_en": "Common Building",
    "type": "building",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67891",
    "address_street": "456 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.911599",
    "coordinate_long": "10.746091"
  },
  {
    "id": 3,
    "name_no": "Kantina",
    "name_en": "Cafeteria",
    "type": "food",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67892",
    "address_street": "789 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.911040",
    "coordinate_long": "10.743292"
  },
  {
    "id": 4,
    "name_no": "Parkering",
    "name_en": "Parking",
    "type": "parking",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67893",
    "address_street": "1011 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.910944",
    "coordinate_long": "10.745312"
  },
  {
    "id": 5,
    "name_no": "Amfiet",
    "name_en": "The Amphitheater",
    "type": "entertainment",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67894",
    "address_street": "1213 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.912252",
    "coordinate_long": "10.744078"
  },
  {
    "id": 6,
    "name_no": "Biblioteket",
    "name_en": "The Library",
    "type": "building",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67895",
    "address_street": "1415 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.912148",
    "coordinate_long": "10.746001"
  },
  {
    "id": 7,
    "name_no": "Gymmet",
    "name_en": "The Gym",
    "type": "fitness",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67896",
    "address_street": "1617 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.911569",
    "coordinate_long": "10.744365"
  },
  {
    "id": 8,
    "name_no": "Anatomibygget",
    "name_en": "The Anatomy Building",
    "type": "building",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67897",
    "address_street": "1819 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.911647",
    "coordinate_long": "10.747276"
  },
  {
    "id": 9,
    "name_no": "Studentkantina",
    "name_en": "Student Cafeteria",
    "type": "food",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67898",
    "address_street": "2021 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.910900",
    "coordinate_long": "10.742994"
  },
  {
    "id": 10,
    "name_no": "Hovedinngangen",
    "name_en": "Main Entrance",
    "type": "entrance",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67899",
    "address_street": "2223 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.911868",
    "coordinate_long": "10.743869"
  },
  {
    "id": 11,
    "name_no": "Auditorium A1",
    "name_en": "Auditorium A1",
    "type": "lecture",
    "mazemap_campus_id": "12345",
    "mazemap_poi_id": "67900",
    "address_street": "2425 Main St",
    "address_postcode": "12345",
    "address_city": "Anytown",
    "coordinate_lat": "59.913022",
    "coordinate_long": "10.746196"
  }  
];
