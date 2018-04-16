import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProblemComponent } from './modify-problem.component';

describe('ModifyProblemComponent', () => {
  let component: ModifyProblemComponent;
  let fixture: ComponentFixture<ModifyProblemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyProblemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
