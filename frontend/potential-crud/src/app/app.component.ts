import { Component, OnInit } from '@angular/core';
import { DevelopersService } from './developers.service';
import { IDeveloper } from './entities/IDeveloper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  developers: IDeveloper[] = [];

  constructor(private service: DevelopersService) { }

  ngOnInit() {
    this.devList();
  }

  async devList() {
    try {
      let developers = await this.service.devList();
      this.developers = developers.docs;
    } catch (err) {
      console.error(err);
    }
  }

}
