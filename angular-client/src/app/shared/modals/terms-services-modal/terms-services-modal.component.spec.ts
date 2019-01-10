import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsServicesModalComponent } from './terms-services-modal.component';

describe('TermsServicesModalComponent', () => {
  let component: TermsServicesModalComponent;
  let fixture: ComponentFixture<TermsServicesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsServicesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsServicesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
