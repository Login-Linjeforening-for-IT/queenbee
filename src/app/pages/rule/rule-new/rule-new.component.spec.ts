import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleNewComponent } from './rule-new.component';

describe('RuleNewComponent', () => {
  let component: RuleNewComponent;
  let fixture: ComponentFixture<RuleNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RuleNewComponent]
    });
    fixture = TestBed.createComponent(RuleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
