import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { thingsIHateRouter } from './routers/router.js';

const debug = createDebug('W6:App');
debug('Loaded Express App');

export const app = express();

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((_request, _response, next) => {
  next();
});

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use('/thingsIHate', thingsIHateRouter);
