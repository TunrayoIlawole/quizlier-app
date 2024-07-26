import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionCreateEditComponent } from './option-create-edit.component';

describe('OptionCreateEditComponent', () => {
  let component: OptionCreateEditComponent;
  let fixture: ComponentFixture<OptionCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionCreateEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
