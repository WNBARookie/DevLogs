import express from 'express';
import { protect } from '../middlewares';
import { createItem, getItems, updateItem, deleteItem } from '../controllers';

const router = express.Router();

/*

    create item for project
    get all items for an project
    update item
    delete item

*/

router.post('/', protect, createItem);
router.get('/', protect, getItems);
router.put('/', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;
