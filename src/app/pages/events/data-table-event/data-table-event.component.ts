import { AfterViewInit, Component, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableEventDataSource } from './data-table-event-datasource';
import { TableConstants } from 'src/app/pages/pages.constants';
import { EventService } from 'src/app/services/api/event.service';
import { EventTableItem } from 'src/app/models/dataInterfaces.model';
import { isDatetimeUnset } from 'src/app/utils/time';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/dialog/confirm/confirm.component';

@Component({
  selector: 'app-data-table-event',
  templateUrl: './data-table-event.component.html'
})
export class DataTableEventComponent implements OnInit, AfterViewInit {
  @Output() scrollToTop = new EventEmitter<string>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<EventTableItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource!: DataTableEventDataSource;
  
  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'name',
    'category_name',
    'location_name',
    'time_type',
    'time_start',
    'time_end',
    'time_publish',
    'capacity',
    'full',
    'canceled',
    'updated_at'
  ];

  constructor(private eventsService: EventService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
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
    this.scrollToTop.emit();

    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        details: 'This will permanently delete the event with id: ' + id,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.deleteItem(id);
        this.dataSource.refresh();
      }
    });
  }

  // Refreshes the table. Used when you need to force a refresh
  refresh() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}