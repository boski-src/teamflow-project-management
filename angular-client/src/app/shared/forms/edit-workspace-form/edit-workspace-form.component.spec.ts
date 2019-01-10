import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkspaceFormComponent } from './edit-workspace-form.component';

describe('EditWorkspaceFormComponent', () => {
  let component: EditWorkspaceFormComponent;
  let fixture: ComponentFixture<EditWorkspaceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkspaceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkspaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
