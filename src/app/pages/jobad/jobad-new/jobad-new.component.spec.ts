import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobadNewComponent } from './jobad-new.component';

describe('JobadNewComponent', () => {
  let component: JobadNewComponent;
  let fixture: ComponentFixture<JobadNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobadNewComponent]
    });
    fixture = TestBed.createComponent(JobadNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
