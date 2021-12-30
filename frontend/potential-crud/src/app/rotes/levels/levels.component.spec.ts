import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TitleBarComponent } from 'src/app/components/title-bar/title-bar.component';
import { TableSortDirective } from 'src/app/directives/table-sort.directive';
import { ISort } from 'src/app/interfaces/ISort';
import { LevelsService } from 'src/app/services/levels/levels.service';

import { LevelsComponent } from './levels.component';

describe('LevelsComponent', () => {
  let component: LevelsComponent;
  let fixture: ComponentFixture<LevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelsComponent, TitleBarComponent, TableSortDirective],
      imports: [ToastrModule.forRoot(), NgbPaginationModule, FormsModule],
      providers: [{
        provide: LevelsService, useClass: LevelsServiceStub
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class LevelsServiceStub {
  levelList(page: number, name: string, sort: ISort | null) {
    return [];
  }
}
