import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageItemBoxComponent } from './message-item-box.component';

describe('MessageItemBoxComponent', () => {
  let component: MessageItemBoxComponent;
  let fixture: ComponentFixture<MessageItemBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageItemBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
