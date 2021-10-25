import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './components/modals/confirm-modal/confirm-modal.component';
import { DeveloperModalComponent } from './components/modals/developer-modal/developer-modal.component';
import { DevelopersService } from './developers.service';
import { IDeveloper } from './entities/IDeveloper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  developers: IDeveloper[] = [];

  constructor(private devService: DevelopersService, private modalService: NgbModal) { }

  ngOnInit() {
    this.devList();
  }

  async devList() {
    try {
      let developers = await this.devService.devList();
      this.developers = developers.docs;
    } catch (err) {
      console.error(err);
      alert('Houve um problema na conexão com o servidor');
    }
  }

  openDevModal() {
    let modalRef = this.modalService.open(DeveloperModalComponent, { size: 'lg', centered: true });
    let modalComp: DeveloperModalComponent = modalRef.componentInstance;
    modalComp.save.subscribe(async (developer: IDeveloper) => {
      try {
        let { _id } = developer;
        delete developer._id;

        if (!_id) await this.devService.insertDev(developer);
        this.devList();
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
          this.devList();
        } catch (err) {
          console.error(err);
          alert('Houve um problema na conexão com o servidor');
        }
      }
    });
  }

}
