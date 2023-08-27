import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobadFormComponent } from './jobad-form.component';

describe('JobadFormComponent', () => {
  let component: JobadFormComponent;
  let fixture: ComponentFixture<JobadFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobadFormComponent]
    });
    fixture = TestBed.createComponent(JobadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
