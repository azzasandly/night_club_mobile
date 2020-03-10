import { TestBed, async, inject } from '@angular/core/testing';

import { SlideGuard } from './slide.guard';

describe('SlideGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlideGuard]
    });
  });

  it('should ...', inject([SlideGuard], (guard: SlideGuard) => {
    expect(guard).toBeTruthy();
  }));
});
