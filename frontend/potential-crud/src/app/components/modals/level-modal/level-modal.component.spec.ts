import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ILevel } from 'src/app/entities/ILevel';
import { ModalComponent } from '../modal/modal.component';

import { LevelModalComponent } from './level-modal.component';

describe('LevelModalComponent', () => {
  let component: LevelModalComponent;
  let fixture: ComponentFixture<LevelModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [FormBuilder, NgbActiveModal],
      declarations: [LevelModalComponent, ModalComponent]
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


  it('should have a label', () => {
    const labels = fixture.debugElement.queryAll(By.css('label'));
    expect(labels.length).toBe(1);
    expect(labels[0].nativeElement.textContent).toBe('*Nível (Ex: Junior, Pleno)');
  });

  it('should have a input', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(1);
  });

  it('should be invalid', () => {
    const form = component.form;
    expect(form.valid).toBeFalsy();
  });

  it('should be valid', () => {
    let developer: ILevel = {
      nivel: '61c57f5fba1f11631503c33c',
      qtd: 1
    };
    component.setValue(developer);

    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
  });

  it('should not submit invalid form', () => {
    const submitButton = fixture.debugElement.query(By.css('#submit-button'));
    spyOn(component.save, 'emit');
    submitButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.save.emit).not.toHaveBeenCalled();
  });

  it('should submit event', () => {
    const submitButton = fixture.debugElement.query(By.css('#submit-button'));
    spyOn(component.save, 'emit');

    let developer: ILevel = {
      nivel: '61c57f5fba1f11631503c33c',
      qtd: 1
    };
    
    component.setValue(developer);

    fixture.detectChanges();
    submitButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.save.emit).toHaveBeenCalled();
  });
});
