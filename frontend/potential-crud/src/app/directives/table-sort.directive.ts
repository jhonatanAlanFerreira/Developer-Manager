import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTableSort]'
})
export class TableSortDirective implements OnInit {
  ascSort = false;
  iSorts: HTMLElement[] = [];
  lastSortId = 0;

  constructor(private table: ElementRef) { }

  ngOnInit() {
    this.sortCreate();
  }

  sortCreate() {
    let table: HTMLElement = this.table.nativeElement;
    let ths = table.getElementsByTagName('th');

    for (let i = 0; i < ths.length; i++) {
      let iSort = document.createElement('i');

      iSort.classList.add('fa', 'fa-sort', 'btn');
      iSort.addEventListener('click', () => this.sort(i));
      iSort.id = `th-sort-${i}`;
      this.iSorts.push(iSort);

      ths[i].append(iSort);
    };
  }

  sort(id: number) {
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
  }

}
