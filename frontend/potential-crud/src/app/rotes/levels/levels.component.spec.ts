import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TitleBarComponent } from 'src/app/components/title-bar/title-bar.component';
import { TableSortDirective } from 'src/app/directives/table-sort.directive';
import { RequestInterceptor } from 'src/app/interceptor/request.interceptor';
import { ISort } from 'src/app/interfaces/ISort';
import { LevelsService } from 'src/app/services/levels/levels.service';

import { LevelsComponent } from './levels.component';

describe('LevelsComponent', () => {
  let component: LevelsComponent;
  let fixture: ComponentFixture<LevelsComponent>;
  let service: LevelsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelsComponent, TitleBarComponent, TableSortDirective],
      imports: [ToastrModule.forRoot(), NgbPaginationModule, FormsModule, RouterTestingModule.withRoutes(
        [{path:'levels', component: LevelsComponent}]
      )],
      providers: [{
        provide: LevelsService, useClass: LevelsServiceStub
      }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(LevelsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading icon', () => {
    RequestInterceptor.loading = false;
    fixture.detectChanges();
    let loadingEl = fixture.debugElement.query(By.css('.loading-blur'));
    expect(loadingEl).toBeFalsy();
    RequestInterceptor.loading = true;
    fixture.detectChanges();
    loadingEl = fixture.debugElement.query(By.css('.loading-blur'));
    expect(loadingEl).toBeTruthy();
  });

  it('should have a table', () => {
    const tableEl = fixture.debugElement.query(By.css('table'));
    expect(tableEl).toBeTruthy();
  });

  it('should have 10 levels', fakeAsync(() => {
    const tableEl = fixture.debugElement.query(By.css('table'));

    component.ngOnInit();
    tick(10);
    fixture.detectChanges();

    let trs = tableEl.nativeElement.getElementsByTagName('tr');
    expect(trs.length).toBe(11);

    const firstDevTds = trs[1].getElementsByTagName('td');
    const secondDevTds = trs[2].getElementsByTagName('td');

    expect(firstDevTds[0].textContent).toBe('Pleno');
    expect(firstDevTds[1].textContent).toBe('1');

    expect(secondDevTds[0].textContent).toBe('Junior');
    expect(secondDevTds[1].textContent).toBe('1');
  }));

  it('should go to next page', fakeAsync(() => {
    component.ngOnInit();
    tick(10);
    fixture.detectChanges();
    expect(component.levels.length).toBe(10);

    const as = fixture.debugElement.queryAll(By.css('.page-link'));
    const nextPageA = as[3].nativeElement;

    component.levels = [];
    nextPageA.click();
    tick(10);
    fixture.detectChanges();
    expect(component.levels.length).toBe(10);
    expect(component.page).toBe(2);
  }));

  it('should list page 2 calling the service', fakeAsync(() => {
    component.ngOnInit();
    tick(10);
    fixture.detectChanges();

    const as = fixture.debugElement.queryAll(By.css('.page-link'));
    const nextPageA = as[3].nativeElement;

    spyOn(service, 'levelList').and.returnValue(new Promise(resolve => resolve(dummyData)));
    nextPageA.click();
    tick(10)
    expect(service.levelList).toHaveBeenCalledWith(2, '', null);
  }));

  it('should edit level', fakeAsync(() => {
    spyOn(component, 'levelEdit');
    component.ngOnInit();
    tick(10);
    fixture.detectChanges();
    const tdActionEdit = fixture.debugElement.query(By.css('.edit'));
    tdActionEdit.nativeElement.click();
    expect(component.levelEdit).toHaveBeenCalledWith({
      _id: '61c57f5fba1f11631503c33c',
      nivel: 'Pleno',
      idString: '61c57f5fba1f11631503c33c',
      developers: [Object(
        {
          _id: '61c57f84ba1f11631503c344',
          nome: 'Jhonatan',
          sexo: 'M',
          idade: 29,
          hobby: 'Codar Pakas',
          datanascimento: '1993-10-20'
        })], qtd: 1
    });
  }));

  it('should delete developer', fakeAsync(() => {
    spyOn(component, 'levelDelete');
    component.ngOnInit();
    tick(10);
    fixture.detectChanges();
    const tdActionDelete = fixture.debugElement.query(By.css('.delete'));
    tdActionDelete.nativeElement.click();
    expect(component.levelDelete).toHaveBeenCalledWith('61c57f5fba1f11631503c33c');
  }));

});

class LevelsServiceStub {
  levelList(page: number, name: string, sort: ISort | null) {
    return new Promise(resolve => resolve(dummyData));
  }
}

const dummyData = {
  "docs": [
    {
      "_id": "61c57f5fba1f11631503c33c",
      "nivel": "Pleno",
      "idString": "61c57f5fba1f11631503c33c",
      "developers": [
        {
          "_id": "61c57f84ba1f11631503c344",
          "nome": "Jhonatan",
          "sexo": "M",
          "idade": 29,
          "hobby": "Codar Pakas",
          "datanascimento": "1993-10-20"
        }
      ],
      "qtd": 1
    },
    {
      "_id": "61c57fc0ba1f11631503c35e",
      "nivel": "Junior",
      "idString": "61c57fc0ba1f11631503c35e",
      "developers": [
        {
          "_id": "61c58004ba1f11631503c369",
          "nome": "Alan Ferreira",
          "sexo": "M",
          "idade": 28,
          "hobby": "Guitarra",
          "datanascimento": "1994-10-19"
        }
      ],
      "qtd": 1
    },
    {
      "_id": "61c58062ba1f11631503c396",
      "nivel": "Senior",
      "idString": "61c58062ba1f11631503c396",
      "developers": [],
      "qtd": 0
    },
    {
      "_id": "61c57f5fba1f11631503c33c",
      "nivel": "Pleno",
      "idString": "61c57f5fba1f11631503c33c",
      "developers": [
        {
          "_id": "61c57f84ba1f11631503c344",
          "nome": "Jhonatan",
          "sexo": "M",
          "idade": 29,
          "hobby": "Codar Pakas",
          "datanascimento": "1993-10-20"
        }
      ],
      "qtd": 1
    },
    {
      "_id": "61c57fc0ba1f11631503c35e",
      "nivel": "Junior",
      "idString": "61c57fc0ba1f11631503c35e",
      "developers": [
        {
          "_id": "61c58004ba1f11631503c369",
          "nome": "Alan Ferreira",
          "sexo": "M",
          "idade": 28,
          "hobby": "Guitarra",
          "datanascimento": "1994-10-19"
        }
      ],
      "qtd": 1
    },
    {
      "_id": "61c58062ba1f11631503c396",
      "nivel": "Senior",
      "idString": "61c58062ba1f11631503c396",
      "developers": [],
      "qtd": 0
    },
    {
      "_id": "61c57f5fba1f11631503c33c",
      "nivel": "Pleno",
      "idString": "61c57f5fba1f11631503c33c",
      "developers": [
        {
          "_id": "61c57f84ba1f11631503c344",
          "nome": "Jhonatan",
          "sexo": "M",
          "idade": 29,
          "hobby": "Codar Pakas",
          "datanascimento": "1993-10-20"
        }
      ],
      "qtd": 1
    },
    {
      "_id": "61c57fc0ba1f11631503c35e",
      "nivel": "Junior",
      "idString": "61c57fc0ba1f11631503c35e",
      "developers": [
        {
          "_id": "61c58004ba1f11631503c369",
          "nome": "Alan Ferreira",
          "sexo": "M",
          "idade": 28,
          "hobby": "Guitarra",
          "datanascimento": "1994-10-19"
        }
      ],
      "qtd": 1
    },
    {
      "_id": "61c58062ba1f11631503c396",
      "nivel": "Senior",
      "idString": "61c58062ba1f11631503c396",
      "developers": [],
      "qtd": 0
    },
    {
      "_id": "61c57f5fba1f11631503c33c",
      "nivel": "Pleno",
      "idString": "61c57f5fba1f11631503c33c",
      "developers": [
        {
          "_id": "61c57f84ba1f11631503c344",
          "nome": "Jhonatan",
          "sexo": "M",
          "idade": 29,
          "hobby": "Codar Pakas",
          "datanascimento": "1993-10-20"
        }
      ],
      "qtd": 1
    }
  ],
  "qtd": 15
};