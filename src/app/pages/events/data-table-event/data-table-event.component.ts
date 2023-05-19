import { AfterViewInit, Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableEventDataSource, DataTableEventItem } from './data-table-event-datasource';
import { TableConstants } from 'src/app/pages/pages.constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-table-event',
  templateUrl: './data-table-event.component.html',
  styleUrls: ['./data-table-event.component.css']
})
export class DataTableEventComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableEventItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableEventDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'name_no',
    'canceled',
    'time_start',
    'time_end',
    'time_publish',
    'time_signup_release',
    'time_signup_deadline',
    'time_updated',
    'image_small',
    'image_banner',
    'link_facebook',
    'link_discord',
    'link_signup',
    'digital',
    'link_stream'
  ];

  constructor(private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource = new DataTableEventDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterStr = this.filterInput;
    
    // Use dataSource.data as the table's data source
    this.table.dataSource = this.dataSource;
  }

  onDelete(id: number): void {
    this.dataSource.deleteItem(id);
    this.dataSource.refresh();
  }
}