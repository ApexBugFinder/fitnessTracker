import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A1ReactFormComponent } from './a1-react-form.component';

describe('A1ReactFormComponent', () => {
  let component: A1ReactFormComponent;
  let fixture: ComponentFixture<A1ReactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A1ReactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A1ReactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
