import { Router } from 'express';

import SupportController from './support.controller.js';

const router = new Router();
const supportController = new SupportController();

// support order v1
router.post(
    '/support',
    supportController.bppSupportOrder,
);

export default router;
