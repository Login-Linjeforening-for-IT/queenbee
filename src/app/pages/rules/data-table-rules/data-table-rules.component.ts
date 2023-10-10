import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableRulesDataSource } from './data-table-rules-datasource';
import { TableConstants } from '../../pages.constants';
import { MatDialog } from '@angular/material/dialog';
import { RulesTableItem } from 'src/app/models/dataInterfaces.model';
import { RulesService } from 'src/app/services/admin-api/rules.service';

@Component({
  selector: 'app-data-table-rules',
  templateUrl: './data-table-rules.component.html'
})

export class DataTableRulesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<RulesTableItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableRulesDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'name_no',
    'name_en'
  ];

  constructor(private rulesService: RulesService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.dataSource = new DataTableRulesDataSource(rulesService);
  }

  ngOnInit() {
    this.dataSource.fetchRules();
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
