import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { LevelsService } from './levels.service';

describe('LevelsService', () => {
  let service: LevelsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(LevelsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
