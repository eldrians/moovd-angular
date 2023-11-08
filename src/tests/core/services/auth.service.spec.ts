import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../../../app/core/services';
import { User } from '../../../app/core/interfaces';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should register a user', () => {
    const mockUser: User = {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    authService.registerUser(mockUser).subscribe((response) => {
      expect(response).toEqual(mockUser);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('POST');
    req.flush(mockUser);
  });

  it('should get user by email', () => {
    const email = 'john@example.com';
    const mockUser: User = {
      id: '1',
      fullName: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };

    authService.getUserByEmail(email).subscribe((response) => {
      expect(response).toEqual([mockUser]);
    });

    const req = httpTestingController.expectOne(`http://localhost:3000/users?email=${email}`);
    expect(req.request.method).toEqual('GET');
    req.flush([mockUser]);
  });
});
