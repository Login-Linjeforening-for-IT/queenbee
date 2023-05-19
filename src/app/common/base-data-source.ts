import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Observable, of as observableOf, merge, fromEvent, BehaviorSubject} from 'rxjs';
import {ElementRef} from "@angular/core";
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

export abstract class BaseDataSource<T> extends DataSource<T> {
  data = new BehaviorSubject<T[]>([]);
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filterStr: ElementRef<HTMLInputElement> | undefined;

  constructor() {
    super();
  }

  get dataLength(): number {
    return this.data.getValue().length;
  }

  connect(): Observable<T[]> {
    if (this.paginator && this.sort && this.filterStr) {
      // setup for the filter
      const filter$ = fromEvent<KeyboardEvent>(this.filterStr.nativeElement, 'input')
        .pipe(
          debounceTime(200), // Wait for 200ms pause in events
          distinctUntilChanged(), // Only emit when the value changes
          map(event => (event.target as HTMLInputElement).value.trim().toLowerCase()),
        );
  
      filter$.subscribe(() => {
        if (this.paginator) {
          this.paginator.pageIndex = 0; // reset pagination whenever the filter changes
        }
      });

      this.paginator.page.subscribe(() => {
        if(this.filterStr) {
          this.filterStr.nativeElement.value = ''; // reset filterInput when the page changes
        }
      });

      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data.value), this.paginator.page, this.sort.sortChange, filter$)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData(this.getFilteredData([...this.data.value])));
        }));
    } else {
      throw Error('Please set the paginator, sort, and filterStr on the data source before connecting.');
    }
  }

  disconnect(): void {}

  getPagedData(data: T[]): T[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.slice(startIndex, startIndex + this.paginator.pageSize);
    } else {
      return data;
    }
  }

  refresh(): void {
    if (this.paginator) {
      this.paginator._changePageSize(this.paginator.pageSize);
    }
  }

  abstract getSortedData(data: T[]): T[];

  deleteItem(id: number): void {
    const currentItems = this.data.value;
    const filteredItems = currentItems.filter(item => this.getItemId(item) !== id);
    this.data.next(filteredItems);
  }

  getFilteredData(data: T[]): T[] {
    if(!this.filterStr) {
      return data;
    }

    const filterValue = this.filterStr.nativeElement.value.trim().toLowerCase();

    return data.filter(row => {
      const reducedRowData = Object.values(row as Object).join('').toLowerCase();
      return reducedRowData.includes(filterValue);
    });
  }

  abstract getItemId(item: T): number;
}