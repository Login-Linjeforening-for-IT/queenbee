import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCopyComponent } from './event-copy.component';

describe('EventCopyComponent', () => {
  let component: EventCopyComponent;
  let fixture: ComponentFixture<EventCopyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventCopyComponent]
    });
    fixture = TestBed.createComponent(EventCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
