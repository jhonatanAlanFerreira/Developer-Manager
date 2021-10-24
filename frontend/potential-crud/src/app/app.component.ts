import { Component, OnInit } from '@angular/core';
import { DevelopersService } from './developers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private service: DevelopersService) { }

  ngOnInit() {
    this.service.devList();
  }
}
