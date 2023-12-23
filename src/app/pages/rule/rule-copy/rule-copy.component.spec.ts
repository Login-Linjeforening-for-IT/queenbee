import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleCopyComponent } from './rule-copy.component';

describe('RuleCopyComponent', () => {
  let component: RuleCopyComponent;
  let fixture: ComponentFixture<RuleCopyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleCopyComponent]
    });
    fixture = TestBed.createComponent(RuleCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
