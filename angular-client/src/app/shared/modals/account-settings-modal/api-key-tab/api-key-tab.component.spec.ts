import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiKeyTabComponent } from './api-key-tab.component';

describe('ApiKeyTabComponent', () => {
  let component: ApiKeyTabComponent;
  let fixture: ComponentFixture<ApiKeyTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiKeyTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiKeyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
