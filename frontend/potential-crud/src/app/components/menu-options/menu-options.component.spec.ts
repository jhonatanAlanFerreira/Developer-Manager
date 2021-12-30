import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuOptionsComponent } from './menu-options.component';

describe('MenuOptionsComponent', () => {
  let component: MenuOptionsComponent;
  let fixture: ComponentFixture<MenuOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuOptionsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a close button icon', () => {
    const buttonIcon = fixture.debugElement.queryAll(By.css('.fa-times-circle'));
    expect(buttonIcon.length).toBe(1);
  });

  it('should show two p elements', () => {
    const pElements = fixture.debugElement.queryAll(By.css('p'));
    expect(pElements.length).toBe(2);
    expect(pElements[0].nativeElement.textContent).toBe('Desenvolvedores');
    expect(pElements[1].nativeElement.textContent).toBe('Níveis');
  });

});
