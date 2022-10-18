import * as mongoose from 'mongoose';
import config from './config';

mongoose
  .connect(config.DB_CONNECTION_STRING)
  .then(() => console.log('MongoDB ready'))
  .catch(console.error);
