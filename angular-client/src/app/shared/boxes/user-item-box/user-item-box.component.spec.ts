import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserItemBoxComponent } from './user-item-box.component';

describe('UserItemBoxComponent', () => {
  let component: UserItemBoxComponent;
  let fixture: ComponentFixture<UserItemBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserItemBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
