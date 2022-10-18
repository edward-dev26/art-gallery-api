import { Request, Response } from 'express';
import { IPaintingPayload, IPaintingView } from '../interfaces/Painting';
import Painting from '../models/painting';
import { mapPaintingForView } from '../mappers/paintings';
import { IIdParams, IListResponse, IPaginationQuery } from '../interfaces/Base';

interface IGetPaintingsQueryParams extends IPaginationQuery {
  gallery: string;
}

export const getPaintings = async (
  req: Request<unknown, unknown, unknown, IGetPaintingsQueryParams>,
  res: Response<IListResponse<IPaintingView>>
) => {
  const { limit, offset, gallery } = req.query;

  try {
    const query = gallery ? { gallery } : {};

    const count = await Painting.count(query);

    const paintings = await Painting.find(query)
      .skip(+offset)
      .limit(+limit);

    await Promise.all(
      paintings.map((p) => Promise.all([p.populate('author'), p.populate('gallery')]))
    );

    const items = paintings.map(mapPaintingForView);

    res.send({
      count,
      items,
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const getPainting = async (
  req: Request<IIdParams>,
  res: Response<IPaintingView | string>
) => {
  const id = req.params.id;

  try {
    const painting = await Painting.findById(id);

    if (!painting) {
      return res.status(404).send('Not Found');
    }

    await painting.populate('author');
    await painting.populate('gallery');

    const response = mapPaintingForView(painting);

    res.send(response);
  } catch (e: any) {
    res.status(500).send(e);
  }
};

export const postPainting = async (
  req: Request<unknown, unknown, IPaintingPayload>,
  res: Response<IPaintingView>
) => {
  try {
    const { name, year, technique, genre, author, gallery } = req.body;

    const painting = new Painting({
      name,
      year,
      technique,
      genre,
      author,
      gallery,
    });

    await painting.save();
    await painting.populate('author');
    await painting.populate('gallery');

    const response = mapPaintingForView(painting);

    res.status(201).send(response);
  } catch (e: any) {
    res.status(400).send(e);
  }
};

export const putPainting = async (
  req: Request<IIdParams, unknown, IPaintingPayload>,
  res: Response<IPaintingView | string>
) => {
  try {
    const { name, year, technique, genre, author, gallery } = req.body;
    const id = req.params.id;

    if (!name || !year || !technique || !genre || !author) {
      return res.status(400).send('Invalid request body');
    }

    const painting = await Painting.findById(id);

    if (!painting) {
      return res.status(404).send('Not Found');
    }

    painting.name = name;
    painting.year = year;
    painting.technique = technique;
    painting.genre = genre;
    painting.author = author;
    painting.gallery = gallery;

    await painting.save();
    await painting.populate('author');
    await painting.populate('gallery');

    console.log(painting);

    const response = mapPaintingForView(painting);

    res.send(response);
  } catch (e: any) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const deletePainting = async (req: Request<IIdParams>, res: Response) => {
  const id = req.params.id;
  const painting = await Painting.findById(id);

  if (!painting) {
    return res.status(404).send('Not Found');
  }

  try {
    await painting.deleteOne();

    res.send();
  } catch (e: any) {
    res.status(500).send();
  }
};
