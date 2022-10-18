import { Schema, model } from 'mongoose';
import { IAuthor } from '../interfaces/Author';

const Author = new Schema<IAuthor>({
  firstname: {
    type: String,
    required: true,
    max: 128,
  },
  lastname: {
    type: String,
    required: true,
    max: 128,
  },
});

export default model('Author', Author);
