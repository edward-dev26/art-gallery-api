import { Router } from 'express';
import {
  deletePainting,
  getPainting,
  getPaintings,
  postPainting,
  putPainting,
} from '../controlers/paintings';

const router = Router();

router.get('', getPaintings);
router.get('/:id', getPainting);
router.post('', postPainting);
router.put('/:id', putPainting);
router.delete('/:id', deletePainting);

export default router;
