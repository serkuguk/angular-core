import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule} from "@angular/common";
import {TuiButton, TuiLoader, tuiLoaderOptionsProvider} from "@taiga-ui/core";
import {character} from "libphonenumber-js/source/AsYouTypeFormatter.PatternParser";
export type ButtonType = 'button' | 'submit';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [
      CommonModule,
      TuiButton
    ],
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @Input() type: ButtonType;
    @Input() disabled: boolean = false;
    @Input() size: string | any = "l";
    @Input() icon?: string;
    @Input() iconRight?: string;
    @Output() click = new EventEmitter<void>();

    constructor() {
        this.type = 'button';
    }

    ngOnInit(): void {
    }

    onClick(): void {
       this.click.emit();
    }

}
