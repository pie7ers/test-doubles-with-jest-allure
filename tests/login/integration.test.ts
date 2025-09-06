import request from 'supertest';
import app from '../../src/app'
import { IUser } from '../../src/models/user';

describe('Real Mock', () => {
  it('Succesful Login', async () => {
    const response = await request(app).post('/api/v1/users/login')
      .send({
        "username": "alice",
        "password": "1234"
      });


    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true)
    const user = response.body.user as IUser
    expect(user.username).toBe('alice')
  })

  it('Wrong Login', async () => {
    const response = await request(app).post('/api/v1/users/login')
      .send({
        "username": "aliceX",
        "password": "1234"
      });

    expect(response.status).toBe(401)
    expect(response.body.success).toBe(false)
    expect(response.body.message).toBe('wrong credentials')
  })
})