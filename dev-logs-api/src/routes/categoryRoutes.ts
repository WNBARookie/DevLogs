import express from 'express';
import { getAllCategories, getCategoryById } from '../controllers/categoryController';

const router = express.Router();

router.get('/all', getAllCategories);
router.get('/:id', getCategoryById);

module.exports = router;
