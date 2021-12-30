import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LevelsService } from 'src/app/services/levels/levels.service';
import { ModalComponent } from '../modal/modal.component';

import { DeveloperModalComponent } from './developer-modal.component';

describe('DeveloperModalComponent', () => {
  let component: DeveloperModalComponent;
  let fixture: ComponentFixture<DeveloperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [FormBuilder, NgbActiveModal,
        { provide: LevelsService, useClass: LevelsServiceStub }
      ],
      declarations: [DeveloperModalComponent, ModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class LevelsServiceStub { }
