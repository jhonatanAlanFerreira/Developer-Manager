import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { DevelopersService } from 'src/app/services/developers/developers.service';

import { DevelopersComponent } from './developers.component';

describe('DevelopersComponent', () => {
  let component: DevelopersComponent;
  let fixture: ComponentFixture<DevelopersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevelopersComponent],
      imports:[[ToastrModule.forRoot()]],
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

class DevelopersServiceStub{}
