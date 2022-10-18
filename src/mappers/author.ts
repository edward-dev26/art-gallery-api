import { IAuthor, IAuthorView } from '../interfaces/Author';
import { FlattenMaps } from 'mongoose';

export const mapAuthorForView = ({
  firstname,
  lastname,
  _id,
}: FlattenMaps<IAuthor>): IAuthorView => {
  return {
    firstname,
    lastname,
    id: _id.toString(),
  };
};
