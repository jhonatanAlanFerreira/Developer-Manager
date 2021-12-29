import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { LevelsService } from 'src/app/services/levels/levels.service';

import { LevelsComponent } from './levels.component';

describe('LevelsComponent', () => {
  let component: LevelsComponent;
  let fixture: ComponentFixture<LevelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelsComponent],
      imports: [ToastrModule.forRoot()],
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

class LevelsServiceStub{}
