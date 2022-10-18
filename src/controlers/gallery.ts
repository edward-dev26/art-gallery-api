import { Request, Response } from 'express';
import { IGallery, IGalleryView } from '../interfaces/Gallery';
import Gallery from '../models/gallery';
import { mapGalleryForView } from '../mappers/gallery';
import { IIdParams, IListResponse, IPaginationQuery } from '../interfaces/Base';
import Painting from '../models/painting';

export const getGalleries = async (
  req: Request<unknown, unknown, unknown, IPaginationQuery>,
  res: Response<IListResponse<IGalleryView>>
) => {
  const { limit, offset } = req.query;

  try {
    const count = await Gallery.count();
    const galleries = await Gallery.find()
      .skip(+offset)
      .limit(+limit);

    const items = await Promise.all(
      galleries.map(async (g) => {
        const paintingsCount = await Painting.count({ gallery: g._id });

        return mapGalleryForView(g, paintingsCount);
      })
    );

    res.send({
      count,
      items,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const getGallery = async (req: Request<IIdParams>, res: Response<IGalleryView | string>) => {
  const id = req.params.id;

  try {
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).send('Not Found');
    }

    const paintingsCount = await Painting.count({ gallery: gallery._id });

    const response = mapGalleryForView(gallery, paintingsCount);

    res.send(response);
  } catch (e: any) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const postGallery = async (
  req: Request<unknown, unknown, IGallery>,
  res: Response<IGalleryView>
) => {
  const { name } = req.body;

  try {
    const gallery = new Gallery({ name });

    await gallery.save();

    const response = mapGalleryForView(gallery, 0);

    res.status(201).send(response);
  } catch (e: any) {
    res.status(400).send(e);
  }
};

export const putGallery = async (req: Request<IIdParams, unknown, IGallery>, res: Response) => {
  const { name } = req.body;
  const id = req.params.id;

  try {
    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return res.status(404).send('Not Found');
    }

    if (!name) {
      return res.status(400).send('Invalid request body');
    }

    gallery.name = name;

    await gallery.save();

    const paintingsCount = await Painting.count({ gallery: gallery._id });

    const response = mapGalleryForView(gallery, paintingsCount);

    res.send(response);
  } catch (e: any) {
    res.status(500).send(e);
  }
};

export const deleteGallery = async (req: Request<IIdParams>, res: Response) => {
  const id = req.params.id;
  const gallery = await Gallery.findById(id);

  if (!gallery) {
    return res.status(404).send('Not Found');
  }

  try {
    await gallery.deleteOne();

    res.send();
  } catch (e: any) {
    res.status(500).send();
  }
};
