import { Router } from 'express';
const router = Router();

import newsRoutes from './api/newsRoutes.js';
import searchRoutes from './api/searchRoutes.js'
import htmlRoutes from './htmlRoutes.js';

router.use('/api', newsRoutes);
router.use('/api', searchRoutes);
router.use('/', htmlRoutes);



export default router;