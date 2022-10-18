import { Schema, model } from 'mongoose';
import { IGallery } from '../interfaces/Gallery';

const Gallery = new Schema<IGallery>({
  name: {
    type: String,
    required: true,
    max: 128,
  },
});

export default model('Gallery', Gallery);
