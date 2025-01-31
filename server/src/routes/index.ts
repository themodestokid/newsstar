import { Router } from 'express';
const router = Router();

import newsRoutes from './api/newsRoutes.js';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', newsRoutes);
router.use('/', htmlRoutes);

export default router;