import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableJobadsComponent } from './data-table-jobads.component';

describe('DataTableJobadsComponent', () => {
  let component: DataTableJobadsComponent;
  let fixture: ComponentFixture<DataTableJobadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTableJobadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTableJobadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
