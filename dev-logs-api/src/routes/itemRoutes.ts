import express from 'express';
import { protect } from '../middlewares';
import { createItem, getItems, getItemDetails, updateItem, deleteItem } from '../controllers';

const router = express.Router();

/*

    create item for category
    get all items for an category
    get item details by id 
    update item
    delete item
    generate item summary

*/

router.post('/', protect, createItem);
router.get('/', protect, getItems);
router.get('/:id', protect, getItemDetails);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;
