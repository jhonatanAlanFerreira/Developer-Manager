import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeveloper } from 'src/app/entities/IDeveloper';

@Component({
  selector: 'app-developer-modal',
  templateUrl: './developer-modal.component.html',
  styleUrls: ['./developer-modal.component.scss']
})
export class DeveloperModalComponent implements OnInit {
  @Output() save = new EventEmitter<IDeveloper>();
  form: FormGroup;
  sendInvalidCheck = false;

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      _id: [''],
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(1), Validators.max(200)]],
      datanascimento: ['', Validators.required],
      hobby: ['']
    });
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

}
