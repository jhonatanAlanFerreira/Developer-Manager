import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TitleBarComponent } from 'src/app/components/title-bar/title-bar.component';
import { TableSortDirective } from 'src/app/directives/table-sort.directive';
import { ISort } from 'src/app/interfaces/ISort';
import { DevelopersService } from 'src/app/services/developers/developers.service';

import { DevelopersComponent } from './developers.component';

describe('DevelopersComponent', () => {
  let component: DevelopersComponent;
  let fixture: ComponentFixture<DevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevelopersComponent, TitleBarComponent, TableSortDirective],
      imports: [[ToastrModule.forRoot()], NgbPaginationModule, FormsModule],
      providers: [{
        provide: DevelopersService, useClass: DevelopersServiceStub
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class DevelopersServiceStub {
  devList(page: number, name: string, sort: ISort | null) {
    return [];
  }
}
