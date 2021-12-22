import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  @Output() addClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
