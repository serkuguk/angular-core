import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[numberOnly]'
})
export class NumberOnlyDirective {
    @HostListener('keydown', ['$event']) 
    onKeyDown(event) {
        const keys = ['delete', 'backspace', 'tab', 'escape', 'enter'];
        if (keys.indexOf(event.key.toLowerCase()) !== -1)  return;

        let regEx =  new RegExp('^[0-9]*$');

        if(!regEx.test(event.key)) {
           event.preventDefault();
        }
    }
}