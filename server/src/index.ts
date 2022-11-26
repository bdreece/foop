import 'reflect-metadata';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';

import authenticate from './middlewares/authenticate';
import { createGraphQLMiddleware } from './api/graphql';

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(compression());
app.use(
  cors({
    origin: 'http://localhost:5173',
    exposedHeaders: 'set-cookie',
    credentials: true,
  }),
);
app.use(morgan('dev'));
app.post('/api/graphql', authenticate);

createGraphQLMiddleware().then(mw => app.use('/api/graphql', mw));

app.listen(PORT, () => console.log(`Listening on :${PORT}`));
