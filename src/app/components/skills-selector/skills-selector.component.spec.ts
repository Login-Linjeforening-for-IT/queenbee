import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsSelectorComponent } from './skills-selector.component';

describe('SkillsSelectorComponent', () => {
  let component: SkillsSelectorComponent;
  let fixture: ComponentFixture<SkillsSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkillsSelectorComponent]
    });
    fixture = TestBed.createComponent(SkillsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
