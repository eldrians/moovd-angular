import { User } from '../../../app/core/interfaces';

describe('User Interface', () => {
  it('should define the User interface', () => {
    const user: User = {
      fullName: 'user',
      email: 'user@mail.com',
      password: '123',
    };

    expect(user).toBeDefined();
    expect(user.fullName).toBe('user');
    expect(user.email).toBe('user@mail.com');
    expect(user.password).toBe('123');
  });
});
