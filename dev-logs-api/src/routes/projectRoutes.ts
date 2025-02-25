import express from 'express';
import { createProject, deleteProject, getAllProjectsByCategory, updateProject } from "../controllers/projectController";

const router = express.Router();

router.get('/:categoryId', getAllProjectsByCategory);

router.post('/', createProject);

router.put('/', updateProject);

router.delete('/:id', deleteProject);

module.exports = router;
