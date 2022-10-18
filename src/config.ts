export default {
  PORT: process.env.PORT || 3000,
  DB_CONNECTION_STRING: process.env.DB_URL || '',
  DB_MODELS: {
    GALLERY: 'Gallery',
    PAINTING: 'Painting',
    AUTHOR: 'Author',
  },
};
