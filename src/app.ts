import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from './routers/users';
import healthRouter from './routers/health';

const app = express();
app.use(bodyParser.json());
app.use('/', healthRouter)
app.use('/api/v1/users', usersRouter)

export default app