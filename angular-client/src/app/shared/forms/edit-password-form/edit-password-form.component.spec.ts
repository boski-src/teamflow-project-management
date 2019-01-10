import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPasswordFormComponent } from './edit-password-form.component';

describe('EditPasswordFormComponent', () => {
  let component: EditPasswordFormComponent;
  let fixture: ComponentFixture<EditPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
