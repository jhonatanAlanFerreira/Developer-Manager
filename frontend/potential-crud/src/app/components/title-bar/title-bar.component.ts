import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TitleBarService } from 'src/app/services/title-bars/title-bar.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  @Output() addClicked = new EventEmitter<void>();
  @Input() titleEntity = '';

  constructor(public service: TitleBarService) { }

  ngOnInit(): void {
  }

}
