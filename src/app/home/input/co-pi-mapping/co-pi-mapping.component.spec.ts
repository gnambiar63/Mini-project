import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoPiMappingComponent } from './co-pi-mapping.component';

describe('CoPiMappingComponent', () => {
  let component: CoPiMappingComponent;
  let fixture: ComponentFixture<CoPiMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoPiMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoPiMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
