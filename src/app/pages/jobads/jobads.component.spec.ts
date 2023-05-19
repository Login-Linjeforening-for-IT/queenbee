import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobadsComponent } from './jobads.component';

describe('JobadsComponent', () => {
  let component: JobadsComponent;
  let fixture: ComponentFixture<JobadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
