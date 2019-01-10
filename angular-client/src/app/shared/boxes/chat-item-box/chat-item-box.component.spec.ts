import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatItemBoxComponent } from './chat-item-box.component';

describe('ChatItemBoxComponent', () => {
  let component: ChatItemBoxComponent;
  let fixture: ComponentFixture<ChatItemBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatItemBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
