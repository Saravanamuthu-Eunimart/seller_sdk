import {Router} from 'express';

import SearchController from './search.controller.js';

const router = new Router();
const searchController = new SearchController();

// BPP on search
router.post('/bpp/eunimart_bpp/on_search', searchController.bppOnSearch);

// BPP search
router.post('/search', searchController.bppSearch);

export default router;
