import { IUser } from '../../src/models/user';
import { IAuthService } from '../../src/services/auth'

/* 
  STUB:
  is used to returns fixed data and make a lightweight test implementation of the service
  it always returns the same user
*/
class AuthServiceStub implements IAuthService {
  login(_username: string, _password: string): IUser | null {
    return { id: 99, username: "stub-user", password: "stub-pass" };
  }
}

describe('Stub Tests', () => {
  it('Successfull Login', async()=> {
    const stub = new AuthServiceStub();
    const user = stub.login('test', 'test');
    expect(user?.username).toBe('stub-user');
  })
});