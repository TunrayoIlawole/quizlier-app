import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCreateEditComponent } from './question-create-edit.component';

describe('QuestionCreateEditComponent', () => {
  let component: QuestionCreateEditComponent;
  let fixture: ComponentFixture<QuestionCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionCreateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
