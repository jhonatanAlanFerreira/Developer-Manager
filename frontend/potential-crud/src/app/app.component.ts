import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.prod';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { DeveloperModalComponent } from './components/modals/developer-modal/developer-modal.component';
import { DevelopersService } from './developers.service';
import { IDeveloper } from './entities/IDeveloper';
import { ISort } from './interfaces/ISort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  developers: IDeveloper[] = [];
  page = 1;
  collectionSize = 0;
  nameSearch = '';
  sort: ISort | null = null;

  constructor(private devService: DevelopersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.devList(this.page);
  }

  async devList(page: number) {
    this.page = page;

    try {
      let developers = await this.devService.devList(page, this.nameSearch, this.sort);
      this.developers = developers.docs;
      this.collectionSize = developers.qtd;
    } catch (err) {
      console.error(err);
      alert('Houve um problema na conexão com o servidor');
    }
  }

  devInsert() {
    let modalRef = this.modalService.open(DeveloperModalComponent, { size: 'lg', centered: true });
    let modalComp: DeveloperModalComponent = modalRef.componentInstance;
    modalComp.title = 'Adicionando desenvolvedor';

    modalComp.save.subscribe(async (developer: IDeveloper) => {
      try {
        await this.devService.devInsert(developer);
        this.devList(this.page);
      } catch (err) {
        console.error(err);
        alert('Houve um problema na conexão com o servidor');
      }
    });
  }

  devDelete(devId: string) {
    let modalRef = this.modalService.open(ConfirmModalComponent);
    let modalComp: ConfirmModalComponent = modalRef.componentInstance;

    modalComp.title = "Atenção!";
    modalComp.message = "Deseja mesmo deletar o registro desse desenvolvedor?";
    modalComp.confirm.subscribe(async confirm => {
      if (confirm) {
        try {
          await this.devService.devDelete(devId);
          this.devList(this.page);
        } catch (err) {
          console.error(err);
          alert('Houve um problema na conexão com o servidor');
        }
      }
    });
  }

  devEdit(developer: IDeveloper) {
    let modalRef = this.modalService.open(DeveloperModalComponent, { size: 'lg', centered: true });
    let modalComp: DeveloperModalComponent = modalRef.componentInstance;

    modalComp.title = 'Editando desenvolvedor';
    modalComp.viewInit.subscribe(_ => modalComp.setValue(developer));
    modalComp.save.subscribe(async (developerUpdated: IDeveloper) => {
      try {
        await this.devService.devEdit(developerUpdated, developer._id || '');
        this.devList(this.page);
      } catch (err) {
        console.error(err);
        alert('Houve um problema na conexão com o servidor');
      }
    });
  }

  sorted(e: ISort) {
    this.sort = e;
    this.devList(1);
  }

  get pageSize() {
    return environment.PAGINATE_SIZE;
  }

}
