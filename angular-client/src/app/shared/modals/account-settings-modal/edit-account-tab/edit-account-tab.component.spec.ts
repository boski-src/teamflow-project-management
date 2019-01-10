import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountTabComponent } from './edit-account-tab.component';

describe('EditAccountTabComponent', () => {
  let component: EditAccountTabComponent;
  let fixture: ComponentFixture<EditAccountTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccountTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccountTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
