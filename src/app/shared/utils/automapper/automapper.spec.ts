import {TestBed} from '@angular/core/testing';
import {AutoMapperService} from './automapper';

describe('AutoMapperService', () => {
  it('is provided at the root injector', () => {
    TestBed.configureTestingModule({});
    expect(TestBed.inject(AutoMapperService)).toBeTruthy();
  });
});
