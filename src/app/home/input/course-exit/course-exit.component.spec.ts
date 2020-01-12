import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseExitComponent } from './course-exit.component';

describe('CourseExitComponent', () => {
  let component: CourseExitComponent;
  let fixture: ComponentFixture<CourseExitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseExitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
