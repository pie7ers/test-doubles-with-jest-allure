import { AuthService } from '../services/auth';
import { Request, Response } from 'express'

const authService = new AuthService();

export default function login(req: Request, res: Response): void {
  const { username, password } = req?.body;

  if (!username || !password) {
    res.status(400).send({ 
      success: false, 
      message: "Both username and password are required",
    });
    return;
  }

  const user = authService.login(username, password);

  if (!user) {
    res.status(401).send({
      success: false, 
      message: "wrong credentials",
    })
    return;
  }
  
  res.status(200).send({
    success: true, 
    user,
  });
}