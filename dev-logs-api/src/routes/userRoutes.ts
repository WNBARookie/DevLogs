import express from 'express';
import { registerUser, authenticateUser, getMe } from '../controllers';
import { protect } from '../middlewares';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authenticateUser);
router.get('/me', protect, getMe);

module.exports = router;
