import { AuthService } from "../../src/services/auth";

describe('Login', () => {
  it('Succesful Login', async () => {
    const auth = new AuthService()
    const user = auth.login("alice", "1234")

    expect(user?.username).toBe('alice')
  })
})