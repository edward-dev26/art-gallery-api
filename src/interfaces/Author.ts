import { ObjectId } from 'mongoose';

export interface IAuthor {
  _id: ObjectId;
  firstname: string;
  lastname: string;
}

export interface IAuthorView {
  id: string;
  firstname: string;
  lastname: string;
}

export interface IAuthorPayload {
  firstname: string;
  lastname: string;
}
