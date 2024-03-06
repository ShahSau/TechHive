import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritiesComponent } from './favourities.component';

describe('FavouritiesComponent', () => {
  let component: FavouritiesComponent;
  let fixture: ComponentFixture<FavouritiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
