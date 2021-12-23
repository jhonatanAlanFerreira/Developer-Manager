import { AfterContentInit, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeveloper } from 'src/app/entities/IDeveloper';
import { ILevel } from 'src/app/entities/ILevel';

@Component({
  selector: 'app-level-modal',
  templateUrl: './level-modal.component.html',
  styleUrls: ['./level-modal.component.scss']
})
export class LevelModalComponent implements OnInit, AfterContentInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') this.sendSave();
  }

  @Output() save = new EventEmitter<ILevel>();
  @Output() viewInit = new EventEmitter<void>();
  @Input() title = '';
  form: FormGroup;
  sendInvalidCheck = false;

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nivel: ['', Validators.required]
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

  setValue(level: ILevel) {
    this.form.setValue({
      nivel: level.nivel
    });
  }

}
