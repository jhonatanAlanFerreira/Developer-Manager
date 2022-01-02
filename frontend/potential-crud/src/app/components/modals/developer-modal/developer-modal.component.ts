import { AfterContentInit, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeveloper } from 'src/app/entities/IDeveloper';
import { ILevel } from 'src/app/entities/ILevel';
import { LevelsService } from 'src/app/services/levels/levels.service';

@Component({
  selector: 'app-developer-modal',
  templateUrl: './developer-modal.component.html',
  styleUrls: ['./developer-modal.component.scss']
})
export class DeveloperModalComponent implements OnInit, AfterContentInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'Enter') this.sendSave();
  }

  @Output() save = new EventEmitter<IDeveloper>();
  @Output() viewInit = new EventEmitter<void>();
  @Input() title = '';
  form: FormGroup;
  sendInvalidCheck = false;
  levels: ILevel[];
  levelsLoading = false;

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private levelsService: LevelsService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      sexo: ['', Validators.required],
      idade: ['', [Validators.required, Validators.min(1), Validators.max(200)]],
      datanascimento: ['', Validators.required],
      nivel: ['', Validators.required],
      hobby: ['']
    });

    this.loadLevels();
  }

  async loadLevels() {
    this.levelsLoading = true;

    let levels = await this.levelsService.levelListAll();
    this.levels = levels.docs;
    this.levelsLoading = false;
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
      hobby: developer.hobby,
      nivel: developer.nivel?._id
    });
  }

}
