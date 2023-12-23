import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableJobadsDataSource } from './data-table-jobads-datasource';
import { TableConstants } from '../../pages.constants';
import { JobadService } from 'src/app/services/admin-api/jobad.service';
import { MatDialog } from '@angular/material/dialog';
import { JobadTableItem } from 'src/app/models/dataInterfaces.model';
import { ConfirmComponent } from 'src/app/components/dialog/confirm/confirm.component';

@Component({
  selector: 'app-data-table-jobads',
  templateUrl: './data-table-jobads.component.html'
})

export class DataTableJobadsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<JobadTableItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableJobadsDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'title',
    'company_name',
    'position_title',
    'job_type',
    'time_publish',
    'application_deadline',
    'application_url',
    'visible',
    'updated_at',
  ];
  scrollToTop: any;

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
    const dialogRef = this.dialog.open(ConfirmComponent, {
      
      data: {
        details: 'This will delete the job ad with id: ' + id,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.jobadService.deleteJobad(id);

        this.dataSource.deleteItem(id);
        this.dataSource.refresh();
      }
    });
  }

  formatDatetime(dt: string): string {
    return dt.replace("T", " ").replace("Z", "").replaceAll("-", "/");
  }

  // Refreshes the table. Used when you need to force a refresh
  refresh() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
