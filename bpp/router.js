import { Router } from 'express';

import orderRoutes from "./order/order.routes.js";
import searchRoutes from "./discovery/search.routes.js";
import supportRoutes from "./support/support.routes.js";
import trackRoutes from "./fulfillment/track.routes.js";
// import rateRoutes from "./rating/rating.routes.js";
// import rspRoutes from './rsp/rsp.routes.js'
// import bppClientRoutes from './bpp_client/router.js'
const router = new Router();

router.use(orderRoutes);
router.use(searchRoutes);
router.use(supportRoutes);
router.use(trackRoutes);
// router.use(rateRoutes);
// router.use(rspRoutes);
// router.use(bppClientRoutes);

export default router;