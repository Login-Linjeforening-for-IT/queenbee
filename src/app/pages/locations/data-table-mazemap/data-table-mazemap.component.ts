import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableMazemapDataSource } from './data-table-mazemap-datasource';
import { TableConstants } from '../../pages.constants';
import { LocationService } from 'src/app/services/admin-api/location.service';
import { MatDialog } from '@angular/material/dialog';
import { LocationTableItem } from 'src/app/models/dataInterfaces.model';
import { ConfirmComponent } from 'src/app/components/dialog/confirm/confirm.component';
import { scrollToTop } from 'src/app/utils/core';

@Component({
  selector: 'app-data-table-mazemap',
  templateUrl: './data-table-mazemap.component.html'
})

export class DataTableMazemapComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<LocationTableItem>;
  @ViewChild('filterInput') filterInput!: ElementRef<HTMLInputElement>;
  dataSource: DataTableMazemapDataSource;

  pageSize = TableConstants.PAGE_SIZE
  pageSizeOptions = TableConstants.PAGE_SIZE_OPTIONS

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered (ordering done here, not in html!). */
  displayedColumns = [
    'actions',
    'id',
    'name',
    'mazemap_campus_id',
    'mazemap_poi_id',
    'url',
    'updated_at'
  ];

  constructor(private locService: LocationService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
    this.dataSource = new DataTableMazemapDataSource(locService);
  }

  ngOnInit() {
    this.dataSource.fetchLocations();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterStr = this.filterInput;
    
    // Use dataSource.data as the table's data source
    this.table.dataSource = this.dataSource;
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {
        details: "Do you want to delete the location with ID " + id + "?"
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.locService.deleteLoc(id);
        
        // Removing from table (client side).
        this.dataSource.deleteItem(id);
        this.dataSource.refresh();
      }
    })    
  }
}
