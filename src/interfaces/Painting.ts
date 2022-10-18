import { ObjectId } from 'mongoose';
import { IAuthor, IAuthorView } from './Author';
import { DBEntity } from './Base';
import { IGallery } from './Gallery';

export enum GenreEnum {
  Realism = 'realism',
  Expressionism = 'expressionism',
  Impressionism = 'impressionism',
  Landscape = 'landscape',
  Portrait = 'portrait',
}

export const genreLabels = {
  [GenreEnum.Realism]: 'Realism',
  [GenreEnum.Expressionism]: 'Expressionism',
  [GenreEnum.Impressionism]: 'Impressionism',
  [GenreEnum.Landscape]: 'Landscape',
  [GenreEnum.Portrait]: 'Portrait',
};

export enum TechniqueEnum {
  Underpainting = 'underpainting',
  Sgraffito = 'sgraffito',
  Glazing = 'glazing',
  Stippling = 'stippling',
}

export const techniqueLabels = {
  [TechniqueEnum.Stippling]: 'Stippling',
  [TechniqueEnum.Underpainting]: 'Underpainting',
  [TechniqueEnum.Glazing]: 'Glazing',
  [TechniqueEnum.Sgraffito]: 'Sgraffito',
};

export interface IPainting {
  name: string;
  author: IAuthor | string | ObjectId;
  year: number;
  genre: GenreEnum;
  technique: TechniqueEnum;
  gallery: string | ObjectId | DBEntity<IGallery>;
}

interface IGalleryView {
  id: string;
  name: string;
}

export interface IPaintingView {
  id: string;
  name: string;
  author: IAuthorView | string;
  year: number;
  genre: string;
  technique: string;
  gallery: IGalleryView | string | null;
}

export interface IPaintingPayload {
  name: string;
  author: string;
  year: number;
  genre: GenreEnum;
  technique: TechniqueEnum;
  gallery: string;
}
