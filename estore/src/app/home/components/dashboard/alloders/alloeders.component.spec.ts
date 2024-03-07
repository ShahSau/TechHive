import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlloedersComponent } from './alloeders.component';

describe('AlloedersComponent', () => {
  let component: AlloedersComponent;
  let fixture: ComponentFixture<AlloedersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlloedersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlloedersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
