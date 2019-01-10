import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailTabComponent } from './edit-email-tab.component';

describe('EditEmailTabComponent', () => {
  let component: EditEmailTabComponent;
  let fixture: ComponentFixture<EditEmailTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmailTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
