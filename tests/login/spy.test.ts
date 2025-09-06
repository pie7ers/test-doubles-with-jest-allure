import { AuthService } from "../../src/services/auth";

/* 
  SPY:
  is used to track calls to a function and can return controlled values, answer the questions:
  - Was the method called?
  - How many times was it called?
  - Which arguments were passed to it?
*/

describe('Spy', () => {
  it('Successful Login', () =>{
    const service = new AuthService();
    const spy = jest.spyOn(service, 'login');
    const user = service.login('alice', '1234');

    expect(spy).toHaveBeenCalled();//and Was the method called?
    expect(spy).toHaveBeenCalledTimes(1);// How many times was it called?
    expect(spy).toHaveBeenCalledWith('alice', '1234');//Which arguments were passed to it?
    expect(user?.username).toBe('alice')
  })
})