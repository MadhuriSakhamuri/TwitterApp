import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTweetsPopupComponent } from './individual-tweets-popup.component';

describe('IndividualTweetsPopupComponent', () => {
  let component: IndividualTweetsPopupComponent;
  let fixture: ComponentFixture<IndividualTweetsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualTweetsPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTweetsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
