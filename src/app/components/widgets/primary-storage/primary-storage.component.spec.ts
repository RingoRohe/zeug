import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryStorageComponent } from './primary-storage.component';

describe('PrimaryStorageComponent', () => {
  let component: PrimaryStorageComponent;
  let fixture: ComponentFixture<PrimaryStorageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryStorageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
