import { Router } from 'express';

const router = Router();

import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';
import authRoutes from './authRoutes.js';

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);
router.use('/', htmlRoutes);


export default router;