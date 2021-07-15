import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseAddNewComponent } from './house-add-new.component';

describe('HouseAddNewComponent', () => {
  let component: HouseAddNewComponent;
  let fixture: ComponentFixture<HouseAddNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseAddNewComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
