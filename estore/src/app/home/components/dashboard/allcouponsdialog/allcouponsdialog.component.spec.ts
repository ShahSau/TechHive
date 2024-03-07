import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllcouponsdialogComponent } from './allcouponsdialog.component';

describe('AllcouponsdialogComponent', () => {
  let component: AllcouponsdialogComponent;
  let fixture: ComponentFixture<AllcouponsdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllcouponsdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllcouponsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
