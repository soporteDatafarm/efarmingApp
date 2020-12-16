import { TestBed } from '@angular/core/testing';

import { DownloadInfoService } from './download-info.service';

describe('DownloadInfoService', () => {
  let service: DownloadInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
