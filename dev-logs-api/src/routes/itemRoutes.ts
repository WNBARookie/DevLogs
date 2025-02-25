import express from 'express';
import { createItem, deleteItem, getAllItemsForProject, getItemById, updateItem } from '../controllers';

const router = express.Router();

router.get('/:id', getAllItemsForProject);
router.get('/items/:id', getItemById);

router.post('/', createItem);

router.put('/', updateItem);

router.delete('/:id', deleteItem);

module.exports = router;