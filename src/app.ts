import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import createDebug from 'debug';
import { dataRouter } from './routers/router';
const debug = createDebug('W6:App');

export const app = express();

debug('Loaded Express App');

const corsOptions = {
  origin: '*',
};

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use('/route', dataRouter);
