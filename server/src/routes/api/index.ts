import { Router } from 'express';
const router = Router();

import newsRoutes from './newsRoutes.js';
import userRoutes from './userRoutes.js';

router.use('/news', newsRoutes);
router.use('/users', userRoutes);

export default router;