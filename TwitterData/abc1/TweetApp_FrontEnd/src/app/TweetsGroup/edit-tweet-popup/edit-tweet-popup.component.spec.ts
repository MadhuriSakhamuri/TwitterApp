import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTweetPopupComponent } from './edit-tweet-popup.component';

describe('EditTweetPopupComponent', () => {
  let component: EditTweetPopupComponent;
  let fixture: ComponentFixture<EditTweetPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTweetPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTweetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
