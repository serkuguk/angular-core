import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-notfound-page',
  standalone: true,
  imports: [],
  templateUrl: './notfound-page.component.html',
  styleUrl: './notfound-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotfoundPageComponent {

}
