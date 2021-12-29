import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { LevelModalComponent } from './level-modal.component';

describe('LevelModalComponent', () => {
  let component: LevelModalComponent;
  let fixture: ComponentFixture<LevelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers:[FormBuilder, NgbActiveModal],
      declarations: [ LevelModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
