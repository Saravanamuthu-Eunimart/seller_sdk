import {Router} from 'express';

import TrackController from './track.controller.js';

const router = new Router();
const trackController = new TrackController();

// track order v1
router.post(
    '/track',
    trackController.bppTrackOrder,
);

export default router;
