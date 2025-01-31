import { Router } from 'express';
const router = Router();

<<<<<<< Updated upstream
import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';

router.use('/api', apiRoutes);
=======
import newsRoutes from './api/newsRoutes.js';
import searchRoutes from './api/searchRoutes.js'
import htmlRoutes from './htmlRoutes.js';

router.use('/api', newsRoutes);
router.use('/api', searchRoutes);
>>>>>>> Stashed changes
router.use('/', htmlRoutes);



export default router;