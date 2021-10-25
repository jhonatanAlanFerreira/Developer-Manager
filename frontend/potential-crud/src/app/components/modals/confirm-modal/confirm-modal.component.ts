import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  @Output() confirm = new EventEmitter<boolean>();

  @Input() title = '';
  @Input() message = '';

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  close() {
    this.activeModal.close();
  }

  sendConfirm() {
    this.confirm.emit(true);
    this.close();
  }

}
