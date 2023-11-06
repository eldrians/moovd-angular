import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsDetailComponent } from './gps-detail.component';

describe('GpsDetailComponent', () => {
  let component: GpsDetailComponent;
  let fixture: ComponentFixture<GpsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GpsDetailComponent]
    });
    fixture = TestBed.createComponent(GpsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
