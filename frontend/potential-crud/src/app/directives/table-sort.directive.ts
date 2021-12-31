import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISort } from '../interfaces/ISort';
import { IThColumn } from '../interfaces/IThColumn';

@Directive({
  selector: '[appTableSort]'
})
export class TableSortDirective implements OnInit {
  @Output() sorted = new EventEmitter<ISort>();
  @Input() columns: IThColumn[];

  ascSort = false;
  iSorts: HTMLElement[] = [];
  lastSortId: string | undefined = '';

  constructor(private table: ElementRef) { }

  ngOnInit() {
    this.sortCreate();
  }

  sortCreate() {
    let table: HTMLElement = this.table.nativeElement;
    let ths = table.getElementsByTagName('th');

    for (let i = 0; i < ths.length; i++) {
      let currentColumn = this.columns.find(c => c.title == ths[i].textContent);
      if (!currentColumn) continue;

      let iSort = document.createElement('i');

      iSort.classList.add('fa', 'fa-sort', 'btn');
      iSort.addEventListener('click', () => this.sort(currentColumn?.key));
      iSort.id = `th-sort-${currentColumn.key}`;

      this.iSorts.push(iSort);

      ths[i].append(iSort);
    };
  }

  sort(id: string | undefined) {
    if (this.lastSortId == id) this.ascSort = !this.ascSort;
    else this.ascSort = true;
    this.lastSortId = id;

    this.iSorts.map(is => {
      if (is.id == `th-sort-${id}`) {
        is.classList.remove('fa-sort');
        let arrow = this.ascSort ? 'fa-sort-down' : 'fa-sort-up';
        let arrowToRemove = !this.ascSort ? 'fa-sort-down' : 'fa-sort-up';
        is.classList.remove(arrowToRemove);
        is.classList.add(arrow);
      }
      else {
        is.classList.remove('fa-sort-down', 'fa-sort-up');
        is.classList.add('fa-sort');
      }

    });

    let sort: ISort = { column: id, direction: this.ascSort ? 'asc' : 'des' };
    this.sorted.emit(sort);
  }

}
