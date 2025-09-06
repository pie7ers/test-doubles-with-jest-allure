import { IUser } from '../../src/models/user';
import HttpRequest from '../../request/control/httpRequests';
import CONFIG_SERVER from '../../consts/server';
import { attachJson } from '../../utils/allureAdapter';

const HOST = `http://localhost:${CONFIG_SERVER.PORT}`
const req = new HttpRequest();

describe('Real Mock', () => {

  test('Succesful Login', async () => {
    
    const payload = {
      "username": "alice",
      "password": "1234"
    }
    const response = await req.makeRequest({
      method: 'POST',
      url: `${HOST}/api/v1/users/login`,
      data: payload
    })

    attachJson('Succesful Login', response);

    expect(response.status).toBe(200)
    expect(response?.data?.success).toBe(true)
    const user = response?.data?.user as IUser
    expect(user.username).toBe('alice')
  })

  test('Wrong Login', async () => {
    const payload = {
      "username": "aliceX",
      "password": "1234"
    }

    const response = await req.makeRequest({
      method: 'POST',
      url: `${HOST}/api/v1/users/login`,
      data: payload
    })

    attachJson('Wrong Login', response);

    expect(response.status).toBe(401)
    expect(response?.data?.success).toBe(false)
    expect(response?.data?.message).toBe('wrong credentials')
  })
})