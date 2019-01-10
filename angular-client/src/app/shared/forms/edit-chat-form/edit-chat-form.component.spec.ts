import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChatFormComponent } from './edit-chat-form.component';

describe('EditWorkspaceFormComponent', () => {
  let component: EditChatFormComponent;
  let fixture: ComponentFixture<EditChatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditChatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
