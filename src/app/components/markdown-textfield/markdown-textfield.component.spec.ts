import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownTextfieldComponent } from './markdown-textfield.component';

describe('MarkdownTextfieldComponent', () => {
  let component: MarkdownTextfieldComponent;
  let fixture: ComponentFixture<MarkdownTextfieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarkdownTextfieldComponent]
    });
    fixture = TestBed.createComponent(MarkdownTextfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
