import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPasswordTabComponent } from './edit-password-tab.component';

describe('EditPasswordTabComponent', () => {
  let component: EditPasswordTabComponent;
  let fixture: ComponentFixture<EditPasswordTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPasswordTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPasswordTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
