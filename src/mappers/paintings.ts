import { Types } from 'mongoose';
import { genreLabels, IPainting, IPaintingView, techniqueLabels } from '../interfaces/Painting';
import { mapAuthorForView } from './author';
import { IAuthor } from '../interfaces/Author';
import { DBEntity } from '../interfaces/Base';
import { mapGalleryForView } from './gallery';
import { IGallery } from '../interfaces/Gallery';

const isPopulated = (entity: object | string) => {
  return typeof entity !== 'string' && entity?.constructor?.name !== Types.ObjectId.name;
};

export const mapPaintingForView = ({
  _id,
  author,
  name,
  year,
  technique,
  genre,
  gallery,
}: DBEntity<IPainting>): IPaintingView => {
  return {
    id: _id.toString(),
    name,
    year,
    technique: techniqueLabels[technique],
    genre: genreLabels[genre],
    author: isPopulated(author) ? mapAuthorForView(author as IAuthor) : author.toString(),
    gallery:
      gallery && isPopulated(gallery)
        ? mapGalleryForView(gallery as DBEntity<IGallery>)
        : gallery?.toString() || null,
  };
};
