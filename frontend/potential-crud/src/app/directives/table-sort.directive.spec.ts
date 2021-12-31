import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableSortDirective } from './table-sort.directive';

@Component({
    template: `<table appTableSort [columns]="[{title: 'column_1', key: 'key_1'},{title: 'column_2', key: 'key_2'}]">
        <thead>
            <tr>
                <th>column_1</th>
                <th>column_2</th>
                <th>column_3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>cell_1</td>
                <td>cell_2</td>
                <td>cell_3</td>
            </tr>
        </tbody>
    </table>`
})
class DummyComponent { }

describe('Directive: TableSort', () => {
    let fixture: ComponentFixture<DummyComponent>;
    let directive: TableSortDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TableSortDirective, DummyComponent]
        });

        fixture = TestBed.createComponent(DummyComponent);
        directive = fixture.debugElement.query(By.directive(TableSortDirective)).injector.get(TableSortDirective);
    });

    it('should have sort icons only in columns 1 and 2', () => {
        fixture.detectChanges();
        let icons = fixture.debugElement.queryAll(By.css('i'));
        expect(icons.length).toBe(2);
        expect(icons[0].nativeElement.id).toBe('th-sort-key_1');
        expect(icons[1].nativeElement.id).toBe('th-sort-key_2');
    });

    it('should toggle the sort icons', () => {
        fixture.detectChanges();
        let icons = fixture.debugElement.queryAll(By.css('i'));
        icons[0].nativeElement.click();
        fixture.detectChanges();
        expect(icons[0].nativeElement).toHaveClass('fa-sort-down');
        expect(icons[1].nativeElement).toHaveClass('fa-sort');
        icons[1].nativeElement.click();
        fixture.detectChanges();
        expect(icons[0].nativeElement).toHaveClass('fa-sort');
        expect(icons[1].nativeElement).toHaveClass('fa-sort-down');
    });

    it('should send sort event', () => {
        fixture.detectChanges();
        let spy = spyOn(directive.sorted, 'emit');
        let icons = fixture.debugElement.queryAll(By.css('i'));
        icons[0].nativeElement.click();
        fixture.detectChanges();
        expect(directive.sorted.emit).toHaveBeenCalledWith({ column: 'key_1', direction: 'asc' });
        fixture.detectChanges();
        spy.calls.reset();
        icons[0].nativeElement.click();
        fixture.detectChanges();
        expect(directive.sorted.emit).toHaveBeenCalledWith({ column: 'key_1', direction: 'des' });
    });

});