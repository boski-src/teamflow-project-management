import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChatModalComponent } from './edit-chat-modal.component';

describe('EditChatModalComponent', () => {
  let component: EditChatModalComponent;
  let fixture: ComponentFixture<EditChatModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChatModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
