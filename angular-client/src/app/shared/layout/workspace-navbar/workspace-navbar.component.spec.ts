import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceNavbarComponent } from './workspace-navbar.component';

describe('WorkspaceNavbarComponent', () => {
  let component: WorkspaceNavbarComponent;
  let fixture: ComponentFixture<WorkspaceNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
