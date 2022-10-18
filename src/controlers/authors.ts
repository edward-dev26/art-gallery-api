import { Request, Response } from 'express';
import Author from '../models/author';
import { IAuthorPayload, IAuthorView } from '../interfaces/Author';
import { mapAuthorForView } from '../mappers/author';
import { IIdParams, IListResponse, IPaginationQuery } from '../interfaces/Base';

export const getAuthors = async (
  req: Request<unknown, unknown, unknown, IPaginationQuery>,
  res: Response<IListResponse<IAuthorView>>
) => {
  const { limit, offset } = req.query;

  try {
    const count = await Author.count();
    const authors = await Author.find()
      .skip(+offset)
      .limit(+limit);
    const items = authors.map(mapAuthorForView);

    res.send({
      count,
      items,
    });
  } catch (e: any) {
    res.status(500).send(e);
  }
};

export const getAuthor = async (req: Request<IIdParams>, res: Response<IAuthorView | string>) => {
  const id = req.params.id;

  try {
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).send('Not Found');
    }

    const response = mapAuthorForView(author);

    res.send(response);
  } catch (e: any) {
    res.status(500).send(e);
  }
};

export const postAuthor = async (
  req: Request<unknown, unknown, IAuthorPayload>,
  res: Response<IAuthorView>
) => {
  const { firstname, lastname } = req.body;

  try {
    const author = new Author({
      firstname,
      lastname,
    });

    const document = await author.save();
    const response = mapAuthorForView(document);

    res.status(201).send(response);
  } catch (e: any) {
    res.status(400).send(e);
  }
};

export const putAuthor = async (
  req: Request<IIdParams, unknown, IAuthorPayload>,
  res: Response<IAuthorView | string>
) => {
  const { firstname, lastname } = req.body;
  const id = req.params.id;

  try {
    if (!firstname || !lastname) {
      return res.status(400).send();
    }

    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).send('Not Found');
    }

    author.firstname = firstname;
    author.lastname = lastname;

    await author.save();

    const response = mapAuthorForView(author);

    res.send(response);
  } catch (e: any) {
    res.status(500).send(e);
  }
};

export const deleteAuthor = async (req: Request<IIdParams>, res: Response) => {
  const id = req.params.id;
  const author = await Author.findById(id);

  if (!author) {
    return res.status(404).send('Not Found');
  }

  try {
    await author.deleteOne();

    res.send();
  } catch (e: any) {
    res.status(500).send();
  }
};
