import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
export type ButtonType = 'button' | 'submit';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

    @Input() type: ButtonType;
    @Input() disabled: boolean = false;
    @Input() size: string = "l";
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
