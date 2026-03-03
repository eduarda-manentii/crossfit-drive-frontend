import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreinoForm } from './treino-form';

describe('TreinoForm', () => {
  let component: TreinoForm;
  let fixture: ComponentFixture<TreinoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreinoForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreinoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
