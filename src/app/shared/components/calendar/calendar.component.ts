import {Component, input} from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'core-calendar',
  standalone: true,
  imports: [
    CalendarModule,
    FormsModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  dateFormat = input<string>('dd.mm.yy');
}
