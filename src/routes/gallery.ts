import { Router } from 'express';
import {
  deleteGallery,
  getGalleries,
  getGallery,
  postGallery,
  putGallery,
} from '../controlers/gallery';

const router = Router();

router.get('', getGalleries);
router.get('/:id', getGallery);
router.post('', postGallery);
router.put('/:id', putGallery);
router.delete('/:id', deleteGallery);

export default router;
