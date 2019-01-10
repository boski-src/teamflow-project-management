import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApiKeyFormComponent } from './update-api-key-form.component';

describe('UpdateApiKeyFormComponent', () => {
  let component: UpdateApiKeyFormComponent;
  let fixture: ComponentFixture<UpdateApiKeyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateApiKeyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateApiKeyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
