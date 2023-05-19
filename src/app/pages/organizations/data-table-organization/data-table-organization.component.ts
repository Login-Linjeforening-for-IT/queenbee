import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {
  DataTableOrganizationDataSource,
  DataTableOrganizationItem
} from './data-table-organization-datasource';
import { TableConstants } from '../../pages.constants';

@Component({
  selector: 'app-data-table-organization',
  templateUrl: './data-table-organization.component.html',
  styleUrls: ['./data-table-organization.component.css']
})

export class DataTableOrganizationComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<DataTableOrganizationItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableOrganizationDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'shortname',
    'url_homepage',
    'url_linkedin',
    'url_facebook',
    'url_instagram',
    'logo'
  ];

  constructor() {
    this.dataSource = new DataTableOrganizationDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataSource.filterStr = this.filterInput;
  }

  onDelete(id: number): void {
    this.dataSource.deleteItem(id);
    this.dataSource.refresh();
  }
}
