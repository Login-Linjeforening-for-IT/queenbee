import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobadEditComponent } from './jobad-edit.component';

describe('JobadEditComponent', () => {
  let component: JobadEditComponent;
  let fixture: ComponentFixture<JobadEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobadEditComponent]
    });
    fixture = TestBed.createComponent(JobadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
