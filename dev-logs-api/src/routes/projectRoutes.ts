import express from 'express';
import { createProject, deleteProject, getAllProjectsByCategory, getProjectById, updateProject } from "../controllers/projectController";

const router = express.Router();

router.get('/:categoryId', getAllProjectsByCategory);
router.get('/project/:id', getProjectById);

router.post('/', createProject);

router.put('/', updateProject);

router.delete('/:id', deleteProject);

module.exports = router;
