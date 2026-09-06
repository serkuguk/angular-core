import {TestBed} from '@angular/core/testing';
import {BodyComponent} from './body.component';

describe('BodyComponent', () => {
  it('derives the desktop body class from its inputs', () => {
    const fixture = TestBed.createComponent(BodyComponent);
    fixture.componentRef.setInput('collapsed', true);
    fixture.componentRef.setInput('screenWidth', 769);

    expect(fixture.componentInstance.getBodyClass()).toBe('body-treemed');
  });
});
