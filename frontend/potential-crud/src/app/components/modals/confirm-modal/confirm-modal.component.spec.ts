import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { ModalComponent } from '../modal/modal.component';

import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent, ModalComponent],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have confirm message', () => {
    const pEl = fixture.debugElement.query(By.css('#message'));

    component.message = 'Are you sure to delete this register?';
    fixture.detectChanges();
    expect(pEl.nativeElement.textContent).toBe('Are you sure to delete this register?');
  });

  it('should have confirm text in the confirm button', () => {
    const btnConfirm = fixture.debugElement.query(By.css('#btn-confirm'));

    component.confirmBtnText = 'Confirm';
    fixture.detectChanges();
    expect(btnConfirm.nativeElement.textContent).toBe('Confirm');
  });

  it('should send confirm event', () => {
    const btnConfirm = fixture.debugElement.query(By.css('#btn-confirm'));
    spyOn(component.confirm, 'emit');

    btnConfirm.nativeElement.click();
    fixture.detectChanges();
    expect(component.confirm.emit).toHaveBeenCalledWith(true);
  });

  it('should have cancel button', () => {
    const btnCancel = fixture.debugElement.query(By.css('#btn-cancel'));

    expect(btnCancel.nativeElement.textContent).toBe('Cancelar');
  });

  it('should hide cancel button', () => {
    component.confirmOnly = true;
    fixture.detectChanges();
    const btnCancel = fixture.debugElement.query(By.css('#btn-cancel'));
    expect(btnCancel).toBeFalsy();
  });
});
