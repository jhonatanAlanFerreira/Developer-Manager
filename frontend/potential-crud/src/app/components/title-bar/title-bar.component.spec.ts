import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TitleBarComponent } from './title-bar.component';

describe('TitleBarComponent', () => {
  let component: TitleBarComponent;
  let fixture: ComponentFixture<TitleBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a menu icon', () => {
    const menuIcon = fixture.debugElement.query(By.css('i'));
    expect(menuIcon.nativeElement.textContent).toBe(' Menu');
  });

  it('should have h2 with the window title', () => {
    component.titleEntity = 'Desenvolvedores';
    fixture.detectChanges();
    const h2Title = fixture.debugElement.query(By.css('h2'));
    expect(h2Title.nativeElement.textContent).toBe('Gerenciar Desenvolvedores');
  });

  it('should have add button', () => {
    const aButton = fixture.debugElement.query(By.css('a'));
    expect(aButton).toBeTruthy();
  });

  it('should show the menu', () => {
    expect(component.service.sideBarOpen).toBeFalsy();
    const menuIcon = fixture.debugElement.query(By.css('i'));
    menuIcon.nativeElement.click();
    fixture.detectChanges();
    expect(component.service.sideBarOpen).toBeTruthy();
  });

  it('should send add event', () => {
    const aButton = fixture.debugElement.query(By.css('a'));
    spyOn(component.addClicked, 'emit');
    aButton.nativeElement.click();
    fixture.detectChanges();
    expect(component.addClicked.emit).toHaveBeenCalledWith();
  });
});
