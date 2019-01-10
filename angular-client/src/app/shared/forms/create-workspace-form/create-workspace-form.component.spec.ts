import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkspaceFormComponent } from './create-workspace-form.component';

describe('CreateWorkspaceFormComponent', () => {
  let component: CreateWorkspaceFormComponent;
  let fixture: ComponentFixture<CreateWorkspaceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkspaceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkspaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
