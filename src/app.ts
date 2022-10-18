import path from 'path';
import express, { Application } from 'express';
import authorsRouter from './routes/authors';
import paintingsRouter from './routes/paintings';
import galleryRouter from './routes/gallery';
import config from './config';
import './db';

const app: Application = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/authors', authorsRouter);
app.use('/api/paintings', paintingsRouter);
app.use('/api/galleries', galleryRouter);

app.listen(config.PORT, () => {
  console.log(`Server is listening on ${config.PORT}`);
});
