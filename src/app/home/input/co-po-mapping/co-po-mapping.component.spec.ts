import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { COPOMappingComponent } from './co-po-mapping.component';

describe('COPOMappingComponent', () => {
  let component: COPOMappingComponent;
  let fixture: ComponentFixture<COPOMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ COPOMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(COPOMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
