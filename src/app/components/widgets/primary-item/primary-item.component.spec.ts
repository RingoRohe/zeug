import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryItemComponent } from './primary-item.component';

describe('PrimaryItemComponent', () => {
  let component: PrimaryItemComponent;
  let fixture: ComponentFixture<PrimaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
