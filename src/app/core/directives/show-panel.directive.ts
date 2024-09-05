import {Directive, ElementRef, HostListener, inject, signal} from '@angular/core';

@Directive({
  selector: '[appShowPanel]',
  standalone: true
})
export class ShowPanelDirective {

  public clickOutsideSignal = signal<boolean>(false);
  private elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const clickOutside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickOutside) {
      this.clickOutsideSignal.set(true);
    } else {
      this.clickOutsideSignal.set(false);
    }
  }
}
