import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuOptionsComponent } from './menu-options.component';

describe('MenuOptionsComponent', () => {
  let component: MenuOptionsComponent;
  let fixture: ComponentFixture<MenuOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([
        { path: 'levels', component: DummyComponent },
        { path: 'developers', component: DummyComponent }
      ])],
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

  it('should toggle class hidden', () => {
    const menuBar = fixture.debugElement.query(By.css('.menu-options'));
    const menuBarElement = menuBar.nativeElement;
    expect(menuBarElement).toHaveClass('hidden');
    component.service.sideBarOpen = true;
    fixture.detectChanges();
    expect(menuBarElement).not.toHaveClass('hidden');
  });

  it('should go to levels', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

    const levelsLink = fixture.debugElement.query(
      debugEl => debugEl.name === 'p' && debugEl.nativeElement.textContent === 'Níveis'
    ).nativeElement;

    levelsLink.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['levels']), { skipLocationChange: false, replaceUrl: false, state: undefined });
  });

  it('should go to developers', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

    const levelsLink = fixture.debugElement.query(
      debugEl => debugEl.name === 'p' && debugEl.nativeElement.textContent === 'Desenvolvedores'
    ).nativeElement;

    levelsLink.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['developers']), { skipLocationChange: false, replaceUrl: false, state: undefined });
  });

});

class DummyComponent { }
