import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { GpsService } from '../../../app/core/services';
import {
  IGps,
  ListGpsInterface,
  DetailGpsInterface,
} from '../../../app/core/interfaces';
import { of } from 'rxjs';

describe('GpsService', () => {
  let gpsService: GpsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GpsService],
    });

    gpsService = TestBed.inject(GpsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(gpsService).toBeTruthy();
  });

  it('should get GPS lists', () => {
    const mockGpsData: IGps[] = [
      {
        device_id: 'D-1567',
        device_type: 'Asset',
        timestamp: '31-08-2022 10.20',
        location: 'L1',
      },
      {
        device_id: 'D-1568',
        device_type: 'GPS',
        timestamp: '31-08-2022 10.30',
        location: 'L2',
      },
    ];

    gpsService.getGpsLists().subscribe((lists: ListGpsInterface[]) => {
      expect(lists).toBeDefined();
      expect(lists.length).toBe(2);
      expect(lists[0].device_id).toBe('D-1567'); // Check the first device_id
      expect(lists[1].device_id).toBe('D-1568'); // Check the second device_id
    });

    const req = httpTestingController.expectOne('http://localhost:3000/data');
    expect(req.request.method).toEqual('GET');
    req.flush(mockGpsData);
  });

  it('should get GPS details', () => {
    const deviceId = 'D-1567'; // Define a test deviceId
    const mockGpsData: IGps[] = [
      {
        device_id: 'D-1567',
        device_type: 'Asset',
        timestamp: '31-08-2022 10.20',
        location: 'L1',
      },
      {
        device_id: 'D-1568',
        device_type: 'GPS',
        timestamp: '31-08-2022 10.30',
        location: 'L2',
      },
    ];

    gpsService
      .getGpsDetail(deviceId)
      .subscribe((details: DetailGpsInterface[]) => {
        expect(details).toBeDefined(); // Ensure details is defined
        expect(details.length).toBe(1); // You expect one device's details
        expect(details[0].device_id).toBe('D-1567'); // Check the device_id
        expect(details[0].device_type).toBe('Asset'); // Check the device_type
      });

    const req = httpTestingController.expectOne('http://localhost:3000/data');
    expect(req.request.method).toEqual('GET');
    req.flush(mockGpsData);
  });

  it('should calculate time spent', () => {
    const timestamps: string[] = ['31-08-2022 10.20', '31-08-2022 10.25'];

    const timeSpent = gpsService.calculateTimeSpent(timestamps);

    expect(timeSpent).toBe(10);
  });
});
