import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginHistoryModalComponent } from './login-history-modal.component';

describe('LoginHistoryModalComponent', () => {
  let component: LoginHistoryModalComponent;
  let fixture: ComponentFixture<LoginHistoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginHistoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
