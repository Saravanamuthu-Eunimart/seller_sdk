import {Router} from 'express';

import CancelOrderController from './cancel/cancelOrder.controller.js';
import ConfirmOrderController from './confirm/confirmOrder.controller.js';
import InitOrderController from './init/initOrder.controller.js';
// import OrderHistoryController from './history/orderHistory.controller.js';
import SelectOrderController from './select/selectOrder.controller.js';
import UpdateOrderController from './update/updateOrder.controller.js';
import OrderStatusController from './status/orderStatus.controller.js';
// import { searchProductbyName } from './db/dbService.js';

const rootRouter = new Router();

const cancelOrderController = new CancelOrderController();
const confirmOrderController = new ConfirmOrderController();
const initOrderController = new InitOrderController();
// const orderHistoryController = new OrderHistoryController();
const orderStatusController = new OrderStatusController();
const selectOrderController = new SelectOrderController();
const updateOrderController = new UpdateOrderController();

// select order v1
rootRouter.post(
    '/select',
    selectOrderController.bppSelect,
);

// init order v1
rootRouter.post(
    '/init',
    initOrderController.bppInitOrder,
);

// confirm order v1
rootRouter.post(
    '/confirm',
    confirmOrderController.bppConfirmOrder,
);

// cancel order v1
rootRouter.post(
    '/cancel',
    cancelOrderController.bppCancelOrder,
);

// bpp update order v1
rootRouter.post(
    '/update',
    updateOrderController.bppUpdateOrder,
);

// bpp update order v1
rootRouter.post(
    '/status',
    orderStatusController.bppStatusOrder,
);

export default rootRouter;
