import { model, Schema, Types } from 'mongoose';
import { GenreEnum, IPainting, TechniqueEnum } from '../interfaces/Painting';
import config from '../config';

const Painting = new Schema<IPainting>({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 128,
  },
  author: {
    type: Types.ObjectId,
    required: true,
    ref: config.DB_MODELS.AUTHOR,
  },
  year: {
    type: Number,
    required: true,
    max: new Date().getFullYear(),
  },
  genre: {
    type: String,
    required: true,
    enum: [
      GenreEnum.Landscape,
      GenreEnum.Expressionism,
      GenreEnum.Realism,
      GenreEnum.Impressionism,
      GenreEnum.Portrait,
    ],
  },
  technique: {
    type: String,
    required: true,
    enum: [
      TechniqueEnum.Glazing,
      TechniqueEnum.Sgraffito,
      TechniqueEnum.Stippling,
      TechniqueEnum.Underpainting,
    ],
  },
  gallery: {
    type: Types.ObjectId,
    required: true,
    ref: config.DB_MODELS.GALLERY,
  },
});

export default model(config.DB_MODELS.PAINTING, Painting);
