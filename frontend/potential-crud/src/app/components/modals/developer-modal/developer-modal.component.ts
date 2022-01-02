import { AfterContentInit, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDeveloper } from 'src/app/entities/IDeveloper';
import { ILevel } from 'src/app/entities/ILevel';
import { LevelsService } from 'src/app/services/levels/levels.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

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

  constructor(private fb: FormBuilder, private activeModal: NgbActiveModal, private levelsService: LevelsService, private modalService: NgbModal, private router: Router) { }

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
    if (!this.levels.length) {
      this.activeModal.close();
      let modalRef = this.modalService.open(ConfirmModalComponent, { size: 'lg', centered: true });
      let modalComp: ConfirmModalComponent = modalRef.componentInstance;
      modalComp.backgroundColor = 'red';
      modalComp.title = 'Atenção!';
      modalComp.message = 'Parece que não há níveis cadastrados para inserir esse desenvolvedor. Deseja ir a tela de cadastro de níveis?';
      modalComp.confirm.subscribe(_ => this.router.navigate(['levels'], {queryParams: {insert:true}}));
    }
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
