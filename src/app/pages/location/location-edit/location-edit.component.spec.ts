import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationEditComponent } from './location-edit.component';

describe('LocationEditComponent', () => {
  let component: LocationEditComponent;
  let fixture: ComponentFixture<LocationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationEditComponent]
    });
    fixture = TestBed.createComponent(LocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
