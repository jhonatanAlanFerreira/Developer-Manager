import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { TitleBarComponent } from 'src/app/components/title-bar/title-bar.component';
import { TableSortDirective } from 'src/app/directives/table-sort.directive';
import { RequestInterceptor } from 'src/app/interceptor/request.interceptor';
import { ISort } from 'src/app/interfaces/ISort';
import { GenrePipe } from 'src/app/pipes/genre.pipe';
import { DevelopersService } from 'src/app/services/developers/developers.service';

import { DevelopersComponent } from './developers.component';

describe('DevelopersComponent', () => {
  let component: DevelopersComponent;
  let fixture: ComponentFixture<DevelopersComponent>;
  let service: DevelopersService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevelopersComponent, TitleBarComponent, TableSortDirective, GenrePipe],
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
    service = TestBed.inject(DevelopersService);
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

  it('should have 10 developers', fakeAsync(() => {
    const tableEl = fixture.debugElement.query(By.css('table'));

    component.ngOnInit();
    tick(10);
    fixture.detectChanges();

    let trs = tableEl.nativeElement.getElementsByTagName('tr');
    expect(trs.length).toBe(11);

    const firstDevTds = trs[1].getElementsByTagName('td');
    const secondDevTds = trs[2].getElementsByTagName('td');

    expect(firstDevTds[0].textContent).toBe('Jhonatan');
    expect(firstDevTds[1].textContent).toBe('Masculino');
    expect(firstDevTds[2].textContent).toBe('29');
    expect(firstDevTds[3].textContent).toBe('Codar Pakas');
    expect(firstDevTds[4].textContent).toBe('20/10/1993');
    expect(firstDevTds[5].textContent).toBe('Pleno');

    expect(secondDevTds[0].textContent).toBe('Alan Ferreira');
    expect(secondDevTds[1].textContent).toBe('Masculino');
    expect(secondDevTds[2].textContent).toBe('28');
    expect(secondDevTds[3].textContent).toBe('Guitarra');
    expect(secondDevTds[4].textContent).toBe('19/10/1994');
    expect(secondDevTds[5].textContent).toBe('Junior');
  }));

  it('should go to next page', fakeAsync(() => {
    component.ngOnInit();
    tick(10);
    fixture.detectChanges();
    expect(component.developers.length).toBe(10);

    const as = fixture.debugElement.queryAll(By.css('.page-link'));
    const nextPageA = as[3].nativeElement;

    component.developers = [];
    nextPageA.click();
    tick(10);
    fixture.detectChanges();
    expect(component.developers.length).toBe(10);
    expect(component.page).toBe(2);
  }));

  it('should list page 2 calling the service', fakeAsync(() => {
    component.ngOnInit();
    tick(10);
    fixture.detectChanges();

    const as = fixture.debugElement.queryAll(By.css('.page-link'));
    const nextPageA = as[3].nativeElement;

    spyOn(service, 'devList').and.returnValue(new Promise(resolve => resolve(dummyData)));
    nextPageA.click();
    tick(10)
    expect(service.devList).toHaveBeenCalledWith(2, '', null);
  }));

  it('should edit developer', fakeAsync(() => {
    spyOn(component, 'devEdit');
    component.ngOnInit();
    tick(10);
    fixture.detectChanges();
    const tdActionEdit = fixture.debugElement.query(By.css('.edit'));
    tdActionEdit.nativeElement.click();
    expect(component.devEdit).toHaveBeenCalledWith({
      _id: '61c57f84ba1f11631503c344',
      nome: 'Jhonatan',
      sexo: 'M',
      idade: 29,
      hobby: 'Codar Pakas',
      datanascimento: '1993-10-20',
      nivel: Object({ _id: '61c57f5fba1f11631503c33c', nivel: 'Pleno' }),
      nivelObjId: '61c57f5fba1f11631503c33c'
    });
  }));

  it('should delete developer', fakeAsync(() => {
    spyOn(component, 'devDelete');
    component.ngOnInit();
    tick(10);
    fixture.detectChanges();
    const tdActionDelete = fixture.debugElement.query(By.css('.delete'));
    tdActionDelete.nativeElement.click();
    expect(component.devDelete).toHaveBeenCalledWith('61c57f84ba1f11631503c344');
  }));

});

class DevelopersServiceStub {
  devList(page: number, name: string, sort: ISort | null) {
    return new Promise(resolve => resolve(dummyData));
  }
}

const dummyData = {
  "docs": [
    {
      "_id": "61c57f84ba1f11631503c344",
      "nome": "Jhonatan",
      "sexo": "M",
      "idade": 29,
      "hobby": "Codar Pakas",
      "datanascimento": "1993-10-20",
      "nivel": {
        "_id": "61c57f5fba1f11631503c33c",
        "nivel": "Pleno"
      },
      "nivelObjId": "61c57f5fba1f11631503c33c"
    },
    {
      "_id": "61c58004ba1f11631503c369",
      "nome": "Alan Ferreira",
      "sexo": "M",
      "idade": 28,
      "hobby": "Guitarra",
      "datanascimento": "1994-10-19",
      "nivel": {
        "_id": "61c57fc0ba1f11631503c35e",
        "nivel": "Junior"
      },
      "nivelObjId": "61c57fc0ba1f11631503c35e"
    },
    {
      "_id": "61c57f84ba1f11631503c344",
      "nome": "Jhonatan",
      "sexo": "M",
      "idade": 29,
      "hobby": "Codar Pakas",
      "datanascimento": "1993-10-20",
      "nivel": {
        "_id": "61c57f5fba1f11631503c33c",
        "nivel": "Pleno"
      },
      "nivelObjId": "61c57f5fba1f11631503c33c"
    },
    {
      "_id": "61c58004ba1f11631503c369",
      "nome": "Alan Ferreira",
      "sexo": "M",
      "idade": 28,
      "hobby": "Guitarra",
      "datanascimento": "1994-10-19",
      "nivel": {
        "_id": "61c57fc0ba1f11631503c35e",
        "nivel": "Junior"
      },
      "nivelObjId": "61c57fc0ba1f11631503c35e"
    },
    {
      "_id": "61c57f84ba1f11631503c344",
      "nome": "Jhonatan",
      "sexo": "M",
      "idade": 29,
      "hobby": "Codar Pakas",
      "datanascimento": "1993-10-20",
      "nivel": {
        "_id": "61c57f5fba1f11631503c33c",
        "nivel": "Pleno"
      },
      "nivelObjId": "61c57f5fba1f11631503c33c"
    },
    {
      "_id": "61c58004ba1f11631503c369",
      "nome": "Alan Ferreira",
      "sexo": "M",
      "idade": 28,
      "hobby": "Guitarra",
      "datanascimento": "1994-10-19",
      "nivel": {
        "_id": "61c57fc0ba1f11631503c35e",
        "nivel": "Junior"
      },
      "nivelObjId": "61c57fc0ba1f11631503c35e"
    },
    {
      "_id": "61c57f84ba1f11631503c344",
      "nome": "Jhonatan",
      "sexo": "M",
      "idade": 29,
      "hobby": "Codar Pakas",
      "datanascimento": "1993-10-20",
      "nivel": {
        "_id": "61c57f5fba1f11631503c33c",
        "nivel": "Pleno"
      },
      "nivelObjId": "61c57f5fba1f11631503c33c"
    },
    {
      "_id": "61c58004ba1f11631503c369",
      "nome": "Alan Ferreira",
      "sexo": "M",
      "idade": 28,
      "hobby": "Guitarra",
      "datanascimento": "1994-10-19",
      "nivel": {
        "_id": "61c57fc0ba1f11631503c35e",
        "nivel": "Junior"
      },
      "nivelObjId": "61c57fc0ba1f11631503c35e"
    },
    {
      "_id": "61c57f84ba1f11631503c344",
      "nome": "Jhonatan",
      "sexo": "M",
      "idade": 29,
      "hobby": "Codar Pakas",
      "datanascimento": "1993-10-20",
      "nivel": {
        "_id": "61c57f5fba1f11631503c33c",
        "nivel": "Pleno"
      },
      "nivelObjId": "61c57f5fba1f11631503c33c"
    },
    {
      "_id": "61c58004ba1f11631503c369",
      "nome": "Alan Ferreira",
      "sexo": "M",
      "idade": 28,
      "hobby": "Guitarra",
      "datanascimento": "1994-10-19",
      "nivel": {
        "_id": "61c57fc0ba1f11631503c35e",
        "nivel": "Junior"
      },
      "nivelObjId": "61c57fc0ba1f11631503c35e"
    }
  ],
  "qtd": 15
};