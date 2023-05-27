import { AfterViewInit, Component, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableEventDataSource } from './data-table-event-datasource';
import { TableConstants } from 'src/app/pages/pages.constants';
import { EventService } from 'src/app/services/api/event.service';
import { EventData } from 'src/app/models/event-data.model';

@Component({
  selector: 'app-data-table-event',
  templateUrl: './data-table-event.component.html'
})
export class DataTableEventComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventData>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource!: DataTableEventDataSource;
  
  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'name_no',
    'category',
    'location',
    'time_start',
    'time_end',
    'time_publish',
    'capacity',
    'full',
    'canceled',
    'time_signup_release',
    'time_signup_deadline',
    'created_at',
  ];

  constructor(private eventsService: EventService, private cdr: ChangeDetectorRef) {
    this.dataSource = new DataTableEventDataSource(eventsService);
  }

  ngOnInit() {
    this.dataSource.fetchEvents();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterStr = this.filterInput;

    // Use dataSource.data as the table's data source
    this.table.dataSource = this.dataSource;
    this.cdr.detectChanges();
  }

  onDelete(id: number): void {
    if(confirm("Are you sure to delete the event with id: " + id + "?")) {
      this.dataSource.deleteItem(id);
      this.dataSource.refresh();
    }
  }

  formatDatetime(dt: string): string {
    if(dt) {
      return dt.replace("T", " ").replace("Z", "").replaceAll("-", "/");
    }
    return dt
  }

  // Refreshes the table. Used when you need to force a refresh
  refresh() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}