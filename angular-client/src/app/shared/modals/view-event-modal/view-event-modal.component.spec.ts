import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEventModalComponent } from './view-event-modal.component';

describe('ViewEventModalComponent', () => {
  let component: ViewEventModalComponent;
  let fixture: ComponentFixture<ViewEventModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEventModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
