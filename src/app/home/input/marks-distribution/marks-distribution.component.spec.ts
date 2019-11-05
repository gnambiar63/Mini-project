import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksDistributionComponent } from './marks-distribution.component';

describe('MarksDistributionComponent', () => {
  let component: MarksDistributionComponent;
  let fixture: ComponentFixture<MarksDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
