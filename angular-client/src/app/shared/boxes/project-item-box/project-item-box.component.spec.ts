import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectItemBoxComponent } from './project-item-box.component';

describe('ProjectItemBoxComponent', () => {
  let component: ProjectItemBoxComponent;
  let fixture: ComponentFixture<ProjectItemBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectItemBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
