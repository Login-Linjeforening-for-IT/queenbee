import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {DataTableOrganizationDataSource} from './data-table-organization-datasource';
import { TableConstants } from '../../pages.constants';
import { OrganizationService } from 'src/app/services/api/organizations.service';
import { MatDialog } from '@angular/material/dialog';
import { isDatetimeUnset } from 'src/app/utils/time';
import { OrgTableItem } from 'src/app/models/dataInterfaces.model';

@Component({
  selector: 'app-data-table-organization',
  templateUrl: './data-table-organization.component.html',
  styleUrls: ['./data-table-organization.component.css']
})

export class DataTableOrganizationComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<OrgTableItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableOrganizationDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'shortname',
    'name',
    'link_homepage',
    'updated_at',
    'logo'
  ];

  constructor(private orgService: OrganizationService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.dataSource = new DataTableOrganizationDataSource(orgService);
  }

  ngOnInit() {
    this.dataSource.fetchOrganizations();
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

  // Refreshes the table. Used when you need to force a refresh
  refresh() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
}
