import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperModalComponent } from './developer-modal.component';

describe('DeveloperModalComponent', () => {
  let component: DeveloperModalComponent;
  let fixture: ComponentFixture<DeveloperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
