import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {SelectComponent} from "@shared/components/controls/select/select.component";

@Component({
  selector: 'app-selectors',
  standalone: true,
  providers: [],
  imports: [
    CommonModule,
    SelectComponent
  ],
  templateUrl: './selectors.component.html',
  styleUrls: ['./selectors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectorsComponent implements OnInit {

  ngOnInit(): void {
  }
}
