import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have green background color', () => {
    const divTitle = fixture.debugElement.query(By.css('#title'));

    component.backgroundColor = 'green';
    fixture.detectChanges();
    expect(divTitle.nativeElement.style.backgroundColor).toBe('green');
  });

  it('should have attention title', ()=>{
    const pEl = fixture.debugElement.query(By.css('p'));

    component.title = 'Attention';
    fixture.detectChanges();
    expect(pEl.nativeElement.textContent).toBe('Attention');
  });

});
