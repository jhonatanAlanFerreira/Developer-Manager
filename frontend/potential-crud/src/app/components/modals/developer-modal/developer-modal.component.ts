import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeveloper } from 'src/app/entities/IDeveloper';

@Component({
  selector: 'app-developer-modal',
  templateUrl: './developer-modal.component.html',
  styleUrls: ['./developer-modal.component.scss']
})
export class DeveloperModalComponent implements OnInit, AfterContentInit {
  @Output() save = new EventEmitter<IDeveloper>();
  @Output() viewInit = new EventEmitter<void>();
  @Input() title = '';
  form: FormGroup;
  sendInvalidCheck = false;

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(1), Validators.max(200)]],
      datanascimento: ['', Validators.required],
      hobby: ['']
    });
  }

  ngAfterContentInit() {
    this.viewInit.emit();
  }

  close() {
    this.activeModal.close();
  }

  sendSave() {
    if (!this.form.valid) {
      this.sendInvalidCheck = true;
      return;
    }

    this.save.emit(this.form.value);
    this.close();
  }

  setValue(developer: IDeveloper) {
    this.form.setValue({
      nome: developer.nome,
      sexo: developer.sexo,
      idade: developer.idade,
      datanascimento: developer.datanascimento,
      hobby: developer.hobby
    });
  }

}
