import { TestBed } from '@angular/core/testing';

import { SetBrowserTitleService } from './set-browser-title.service';

describe('SetBrowserTitleService', () => {
  let service: SetBrowserTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetBrowserTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
