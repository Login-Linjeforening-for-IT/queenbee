import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableRulesDataSource } from './data-table-rules-datasource';
import { TableConstants } from '../../pages.constants';
import { MatDialog } from '@angular/material/dialog';
import { RulesTableItem } from 'src/app/models/dataInterfaces.model';
import { RulesService } from 'src/app/services/admin-api/rules.service';
import { ConfirmComponent } from 'src/app/components/dialog/confirm/confirm.component';

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

  /**
   * This function handles deletion of rules. Will prompt user to confirm deletion.
   * @param id id of rule to delete
   */
  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        details: "Do you want to delete the rule with ID " + id + "?"
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.rulesService.deleteRule(id);
        
        // Removing from table (client side).
        this.dataSource.deleteItem(id);
        this.dataSource.refresh();
      }
    })    
  }
}
