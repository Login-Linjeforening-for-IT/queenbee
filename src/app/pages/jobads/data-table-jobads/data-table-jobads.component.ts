import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableJobadsDataSource, DataTableJobadsItem } from './data-table-jobads-datasource';
import { TableConstants } from '../../pages.constants';

@Component({
  selector: 'app-data-table-jobads',
  templateUrl: './data-table-jobads.component.html'
})

export class DataTableJobadsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableJobadsItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableJobadsDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'title_no',
    'position_title_no',
    'description_short_no',
    'time_publish',
    'time_deadline',
    'time_updated',
    'application_url',
    'application_email',
    'contact_email',
    'contact_phone',
    'image_small',
    'image_banner',
    'remote',
    'type',
    'priority'
  ];

  constructor() {
    this.dataSource = new DataTableJobadsDataSource();
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
