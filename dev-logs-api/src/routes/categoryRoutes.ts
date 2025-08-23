import express from 'express';
import { protect } from '../middlewares';
import { createCategory, getCategories, getCategoryDetails, updateCategory, deleteCategory, getCategorySummary } from '../controllers';

const router = express.Router();

/*

    create category for project
    get all categories for a project
    get category details by id and all items for it
    update category
    delete category
    generate category summary

*/

router.post('/', protect, createCategory);
router.get('/', protect, getCategories);
router.get('/:id', protect, getCategoryDetails);
router.put('/:id', protect, updateCategory);
router.delete('/:id', protect, deleteCategory);
router.get('/summary/:id', protect, getCategorySummary);

module.exports = router;
