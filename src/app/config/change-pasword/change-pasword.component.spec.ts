import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePaswordComponent } from './change-pasword.component';

describe('ChangePaswordComponent', () => {
  let component: ChangePaswordComponent;
  let fixture: ComponentFixture<ChangePaswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePaswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
