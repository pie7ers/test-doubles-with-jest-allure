import { IAuthService } from "../../src/services/auth";

describe('Mock', ()=> {
  it('Successful Login', ()=>{
    const mock: jest.Mocked<IAuthService> = {
      login: jest.fn().mockReturnValue({ id: 99, username: "mock-user-res", password: "mock-pass-res" })
    }

    const result = mock.login('alice','1234')

    expect(mock.login).toHaveBeenCalledWith('alice','1234')
    expect(result?.username).toBe('mock-user-res')
  })
})