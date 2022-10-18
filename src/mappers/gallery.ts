import { IGallery, IGalleryView } from '../interfaces/Gallery';
import { DBEntity } from '../interfaces/Base';

export const mapGalleryForView = (
  { name, _id }: DBEntity<IGallery>,
  paintingsCount?: number
): IGalleryView => {
  const view: IGalleryView = {
    id: _id.toString(),
    name,
  };

  if (paintingsCount !== undefined) {
    view.paintingsCount = paintingsCount;
  }

  return view;
};
