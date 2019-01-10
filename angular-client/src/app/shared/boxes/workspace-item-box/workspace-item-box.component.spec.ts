import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceItemBoxComponent } from './workspace-item-box.component';

describe('WorkspaceItemBoxComponent', () => {
  let component: WorkspaceItemBoxComponent;
  let fixture: ComponentFixture<WorkspaceItemBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceItemBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
