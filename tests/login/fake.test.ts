import { AuthService } from "../../src/services/auth";
import { IUser } from "../../src/models/user";
import { omitAttributes } from "../../utils/objects";


/* 
  FAKE:
  Light implementation of the service that uses in-memory storage
*/
class FakeAuthService implements AuthService {
  private db: Record<string, IUser> = {};

  addUser(user: IUser): void {
    this.db[user.username] = user
  }

  login(username: string, password: string): IUser | null {
    const user = this.db[username];
    return user && user.password === password ? omitAttributes(user, ['password']) : null
  }
}

describe('Fake', () => {
  it('Successful Login', () => {
    const fake = new FakeAuthService();
    fake.addUser({ id: 1, username: 'test', password: '123' });//add to the in-memory database

    const user = fake.login('test', '123')
    expect(user?.username).toBe('test')
  })
})