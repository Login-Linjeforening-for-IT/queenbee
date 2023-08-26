import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableJobadsDataSource } from './data-table-jobads-datasource';
import { TableConstants } from '../../pages.constants';
import { JobadService } from 'src/app/services/api/jobad.service';
import { MatDialog } from '@angular/material/dialog';
import { JobadShort } from 'src/app/models/dataInterfaces.model';

@Component({
  selector: 'app-data-table-jobads',
  templateUrl: './data-table-jobads.component.html'
})

export class DataTableJobadsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<JobadShort>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableJobadsDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'position_title_no',
    'position_title_en',
    'description_short_no',
    'description_short_en'
  ];

  constructor(private jobadService: JobadService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.dataSource = new DataTableJobadsDataSource(jobadService);
  }

  ngOnInit() {
    this.dataSource.fetchJobads();
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
    if(confirm("Are you sure to delete the event with id: " + id)) {
      this.dataSource.deleteItem(id);
      this.dataSource.refresh();
    }
  }

  formatDatetime(dt: string): string {
    return dt.replace("T", " ").replace("Z", "").replaceAll("-", "/");
  }

  // Refreshes the table. Used when you need to force a refresh
  refresh() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
