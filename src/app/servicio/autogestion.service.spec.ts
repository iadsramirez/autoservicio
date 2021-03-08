import { TestBed } from '@angular/core/testing';

import { AutogestionService } from './autogestion.service';

describe('AutogestionService', () => {
  let service: AutogestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutogestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
