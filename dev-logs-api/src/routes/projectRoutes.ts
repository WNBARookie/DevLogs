import express from 'express';
import { protect } from '../middlewares';
import { createProject, getProjects, getProjectDetails, updateProject, deleteProject, getProjectSummary } from '../controllers';

const router = express.Router();

/*

    create project for area
    get all projects for an area
    get project details by id and all categories for it
    update project
    delete project
    generate project summary

*/

router.post('/', protect, createProject);
router.get('/', protect, getProjects);
router.get('/:id', protect, getProjectDetails);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.get('/summary/:id', protect, getProjectSummary);

module.exports = router;
