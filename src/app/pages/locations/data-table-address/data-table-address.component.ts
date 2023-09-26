import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableAddressDataSource } from './data-table-address-datasource';
import { TableConstants } from '../../pages.constants';
import { LocationService } from 'src/app/services/api/location.service';
import { MatDialog } from '@angular/material/dialog';
import { LocationTableItem } from 'src/app/models/dataInterfaces.model';

@Component({
  selector: 'app-data-table-address',
  templateUrl: './data-table-address.component.html'
})

export class DataTableAddressComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LocationTableItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableAddressDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'name',
    'address_street',
    'address_postcode',
    'city_name',
    'url',
    'updated_at'
  ];

  constructor(private locationService: LocationService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.dataSource = new DataTableAddressDataSource(locationService);
  }

  ngOnInit() {
    this.dataSource.fetchLocations();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterStr = this.filterInput;
    
    // Use dataSource.data as the table's data source
    this.table.dataSource = this.dataSource;
  }

  onDelete(id: number): void {
    if(confirm("Are you sure to delete the event with id: " + id)) {
      this.dataSource.deleteItem(id);
      this.dataSource.refresh();
    }
  }
}
