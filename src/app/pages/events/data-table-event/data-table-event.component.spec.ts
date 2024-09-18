import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { DataTableEventComponent } from './data-table-event.component'

describe('DataTableEventComponent', () => {
    let component: DataTableEventComponent;
    let fixture: ComponentFixture<DataTableEventComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
        declarations: [ DataTableEventComponent ],
        imports: [
            NoopAnimationsModule,
            MatPaginatorModule,
            MatSortModule,
            MatTableModule,
        ]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(DataTableEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should compile', () => {
        expect(component).toBeTruthy();
    })
})
