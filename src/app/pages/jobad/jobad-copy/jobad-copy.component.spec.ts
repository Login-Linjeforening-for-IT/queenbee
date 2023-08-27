import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobadCopyComponent } from './jobad-copy.component';

describe('JobadCopyComponent', () => {
  let component: JobadCopyComponent;
  let fixture: ComponentFixture<JobadCopyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobadCopyComponent]
    });
    fixture = TestBed.createComponent(JobadCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
