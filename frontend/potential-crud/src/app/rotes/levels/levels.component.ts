import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/components/modals/confirm-modal/confirm-modal.component';
import { LevelModalComponent } from 'src/app/components/modals/level-modal/level-modal.component';
import { ILevel } from 'src/app/entities/ILevel';
import { RequestInterceptor } from 'src/app/interceptor/request.interceptor';
import { ISort } from 'src/app/interfaces/ISort';
import { LevelsService } from 'src/app/services/levels/levels.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {

  levels: ILevel[] = [];
  page = 1;
  collectionSize = 0;
  nameSearch = '';
  sort: ISort | null = null;

  constructor(private levelService: LevelsService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {
    this.levelList(this.page);
  }

  async levelList(page: number) {
    this.page = page;

    try {
      let levels = await this.levelService.levelList(page, this.nameSearch, this.sort);
      this.levels = levels.docs;
      this.collectionSize = levels.qtd;
    } catch (err) {
      console.error(err);
      alert('Houve um problema na conexão com o servidor');
    }
  }

  levelInsert() {
    let modalRef = this.modalService.open(LevelModalComponent, { size: 'lg', centered: true });
    let modalComp: LevelModalComponent = modalRef.componentInstance;
    modalComp.title = 'Adicionando desenvolvedor';

    modalComp.save.subscribe(async (level: ILevel) => {
      try {
        await this.levelService.levelInsert(level);
        this.levelList(this.page);
        this.toastr.success("Registro inserido com sucesso!");
      } catch (err) {
        console.error(err);
        this.toastr.error('Houve um problema na conexão com o servidor');
      }
    });
  }

  levelDelete(levelId: string) {
    let modalRef = this.modalService.open(ConfirmModalComponent);
    let modalComp: ConfirmModalComponent = modalRef.componentInstance;

    modalComp.title = "Atenção!";
    modalComp.message = "Deseja mesmo deletar o registro desse nível?";
    modalComp.confirm.subscribe(async confirm => {
      if (confirm) {
        try {
          await this.levelService.levelDelete(levelId);
          this.levelList(this.page);
          this.toastr.success("Registro excluído com sucesso!");
        } catch (err:any) {
          console.error(err);
          if (err.error.devsQtd) {
            let { devsQtd } = err.error;
            this.toastr.error(`Existe${devsQtd>1?'m':''} ${devsQtd} desenvolvedor${devsQtd>1?'es':''} nesse nível, portanto o nível não pode ser excluído!`);
          }
          else this.toastr.error('Houve um problema na conexão com o servidor');
        }
      }
    });
  }

  levelEdit(level: ILevel) {
    let modalRef = this.modalService.open(LevelModalComponent, { size: 'lg', centered: true });
    let modalComp: LevelModalComponent = modalRef.componentInstance;

    modalComp.title = 'Editando nível';
    modalComp.viewInit.subscribe(_ => modalComp.setValue(level));
    modalComp.save.subscribe(async (levelUpdated: ILevel) => {
      try {
        await this.levelService.levelEdit(levelUpdated, level._id || '');
        this.levelList(this.page);
        this.toastr.success("Registro editado com sucesso!");
      } catch (err) {
        console.error(err);
        this.toastr.error('Houve um problema na conexão com o servidor');
      }
    });
  }

  sorted(e: ISort) {
    this.sort = e;
    this.levelList(this.page);
  }

  get pageSize() {
    return environment.PAGINATE_SIZE;
  }

  get httpLoading() {
    return RequestInterceptor.loading;
  }

}
