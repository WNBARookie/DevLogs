import express from 'express';
import { createArea, deleteArea, getAreaDetails, getAreas, getAreaSummary, updateArea } from '../controllers';
import { protect } from '../middlewares';

const router = express.Router();

/*

    create area
    get all areas for a user
    get area details by id and all projects for it
    update area
    delete area
    generate area summary

*/

router.post('/', protect, createArea);
router.get('/', protect, getAreas);
router.get('/:id', protect, getAreaDetails);
router.put('/', protect, updateArea);
router.delete('/:id', protect, deleteArea);
router.get('/summary/:id', protect, getAreaSummary);

module.exports = router;
