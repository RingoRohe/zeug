import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryItemComponent } from './secondary-item.component';

describe('SecondaryItemComponent', () => {
  let component: SecondaryItemComponent;
  let fixture: ComponentFixture<SecondaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
