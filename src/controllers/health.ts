import { Request, Response } from 'express';

export default function health(_req: Request, res: Response): void{
  res.status(200).json({ success: true, message: 'ok' });
}