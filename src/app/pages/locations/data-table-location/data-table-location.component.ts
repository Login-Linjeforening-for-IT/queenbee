import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableLocationDataSource, DataTableLocationItem } from './data-table-location-datasource';
import { TableConstants } from '../../pages.constants';

@Component({
  selector: 'app-data-table-location',
  templateUrl: './data-table-location.component.html',
  styleUrls: ['./data-table-location.component.css']
})

export class DataTableLocationComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableLocationItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableLocationDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'name_no',
    'type',
    'mazemap_campus_id',
    'mazemap_poi_id',
    'address_street',
    'address_postcode',
    'address_city',
    'coordinate_lat',
    'coordinate_long'
  ];

  constructor() {
    this.dataSource = new DataTableLocationDataSource();
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
