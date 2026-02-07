import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarExampleComponent } from './calendar';

describe('CalendarExampleComponent', () => {
  let component: CalendarExampleComponent;
  let fixture: ComponentFixture<CalendarExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarExampleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarExampleComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
