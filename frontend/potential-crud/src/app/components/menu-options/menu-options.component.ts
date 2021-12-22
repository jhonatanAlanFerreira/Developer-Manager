import { Component, OnInit } from '@angular/core';
import { TitleBarService } from 'src/app/services/title-bars/title-bar.service';

@Component({
  selector: 'app-menu-options',
  templateUrl: './menu-options.component.html',
  styleUrls: ['./menu-options.component.scss']
})
export class MenuOptionsComponent implements OnInit {

  constructor(public service: TitleBarService) { }

  ngOnInit(): void {
  }

}
