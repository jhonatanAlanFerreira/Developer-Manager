import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { LevelsService } from 'src/app/services/levels/levels.service';
import { ModalComponent } from '../modal/modal.component';
import { IDeveloper } from 'src/app/entities/IDeveloper';

import { DeveloperModalComponent } from './developer-modal.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeveloperModalComponent', () => {
  let component: DeveloperModalComponent;
  let fixture: ComponentFixture<DeveloperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
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

  it('should load levels', fakeAsync(() => {
    component.ngOnInit();
    tick(10);
    expect(component.levels.length).toBe(3);

    fixture.detectChanges();
    const levelsSelect = fixture.debugElement.query(By.css('#levels-select'));
    const levelsOptions = levelsSelect.nativeElement.getElementsByTagName('option');

    expect(levelsOptions.length).toBe(4);
    expect(levelsOptions[0].textContent).toBe('Selecione o nível...');
    expect(levelsOptions[1].textContent).toBe('Junior');
    expect(levelsOptions[1].value).toBe('61c57fc0ba1f11631503c35e');
    expect(levelsOptions[2].textContent).toBe('Pleno');
    expect(levelsOptions[2].value).toBe('61c57f5fba1f11631503c33c');
    expect(levelsOptions[3].textContent).toBe('Senior');
    expect(levelsOptions[3].value).toBe('61c58062ba1f11631503c396');
  }));

  it('should have labels', () => {
    const labels = fixture.debugElement.queryAll(By.css('label'));
    expect(labels.length).toBe(6);
    expect(labels[0].nativeElement.textContent).toBe('*Nome');
    expect(labels[1].nativeElement.textContent).toBe('*Sexo');
    expect(labels[2].nativeElement.textContent).toBe('*Idade');
    expect(labels[3].nativeElement.textContent).toBe('*Data de Nascimento');
    expect(labels[4].nativeElement.textContent).toBe('*Nível');
    expect(labels[5].nativeElement.textContent).toBe('Hobby');
  });

  it('should have 4 inputs', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(4);
  });

  it('should have 2 selects', fakeAsync(() => {
    component.ngOnInit();
    tick(10);
    fixture.detectChanges();
    const selects = fixture.debugElement.queryAll(By.css('select'));
    expect(selects.length).toBe(2);
  }));

  it('should be invalid', () => {
    const form = component.form;
    expect(form.valid).toBeFalsy();
  });

  it('should be valid', () => {
    let developer: IDeveloper = {
      datanascimento: new Date('1993-10-20'),
      hobby: 'Codar Pakas...',
      idade: 29,
      nivel: {
        nivel: "Pleno",
        _id: "61c57f5fba1f11631503c33c"
      },
      nome: 'Jhonatan Ferreira',
      sexo: 'M'
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

    let developer: IDeveloper = {
      datanascimento: new Date('1993-10-20'),
      hobby: 'Codar Pakas...',
      idade: 29,
      nivel: {
        nivel: "Pleno",
        _id: "61c57f5fba1f11631503c33c"
      },
      nome: 'Jhonatan Ferreira',
      sexo: 'M'
    };
    component.setValue(developer);

    fixture.detectChanges();
    submitButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.save.emit).toHaveBeenCalled();
  });
});

class LevelsServiceStub {
  levelListAll() {
    return new Promise(resolve => resolve({
      "docs": [
        {
          "_id": "61c57fc0ba1f11631503c35e",
          "nivel": "Junior",
          "__v": 0,
          "idString": "61c57fc0ba1f11631503c35e",
          "developers": [
            {
              "_id": "61c58004ba1f11631503c369",
              "nome": "Alan Ferreira",
              "sexo": "M",
              "idade": 28,
              "hobby": "Guitarra",
              "datanascimento": "1994-10-19",
              "nivel": "61c57fc0ba1f11631503c35e",
              "__v": 0
            }
          ],
          "qtd": 1
        },
        {
          "_id": "61c57f5fba1f11631503c33c",
          "nivel": "Pleno",
          "__v": 0,
          "idString": "61c57f5fba1f11631503c33c",
          "developers": [
            {
              "_id": "61c57f84ba1f11631503c344",
              "nome": "Jhonatan",
              "sexo": "M",
              "idade": 29,
              "hobby": "Codar Pakas",
              "datanascimento": "1993-10-20",
              "nivel": "61c57f5fba1f11631503c33c",
              "__v": 0
            }
          ],
          "qtd": 1
        },
        {
          "_id": "61c58062ba1f11631503c396",
          "nivel": "Senior",
          "__v": 0,
          "idString": "61c58062ba1f11631503c396",
          "developers": [],
          "qtd": 0
        }
      ],
      "qtd": 3
    }));
  }
}
