import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudienceSelectorComponent } from './chip-selector.component';

describe('AudienceSelectorComponent', () => {
  let component: AudienceSelectorComponent;
  let fixture: ComponentFixture<AudienceSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudienceSelectorComponent]
    });
    fixture = TestBed.createComponent(AudienceSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
