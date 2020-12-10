import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPointComponent } from './menu-point.component';

describe('MenuPointComponent', () => {
  let component: MenuPointComponent;
  let fixture: ComponentFixture<MenuPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
