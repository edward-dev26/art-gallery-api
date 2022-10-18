import { Router } from 'express';
import { deleteAuthor, getAuthor, getAuthors, postAuthor, putAuthor } from '../controlers/authors';

const router = Router();

router.get('', getAuthors);
router.get('/:id', getAuthor);
router.post('', postAuthor);
router.put('/:id', putAuthor);
router.delete('/:id', deleteAuthor);

export default router;
