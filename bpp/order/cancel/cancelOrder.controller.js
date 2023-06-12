// import CancelOrderService from './cancelOrder.service.js';
// import BadRequestParameterError from '../../../shared/lib/errors/bad-request-parameter.error.js';
// import { isSignatureValid } from '../../../shared/utils/cryptic.js';
// import messages from '../../../shared/utils/messages.js';
// import { getOrderByTransactionId, getProductById } from '../../../shared/db/dbService.js';
// import { produceKafkaEvent, kafkaClusters } from '../../../shared/eda/kafka.js'
// import { topics } from '../../../shared/eda/consumerInit/initConsumer.js';
// import { v4 as uuidv4 } from 'uuid';
// import CustomLogs from '../../../shared/utils/customLogs.js';
// import { PROTOCOL_CONTEXT, SUBSCRIBER_TYPE } from '../../../shared/utils/seller_enums.js';
// import { getSubscriberType } from '../../../shared/utils/registryApis/registryUtil.js';
// import { GetBppOrder } from '../../../shared/db/bpp_dbService.js';

// const cancelOrderService = new CancelOrderService();
import { setContext } from "../../config/global_context.js";
import { Emitter } from "../../emitter/emitter.js";
class CancelOrderController {

    /**
    * select
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    async bppCancelOrder(req, res, next) {
        let data = {
            response: JSON.stringify(req.body),
        }
        setContext(req.body.context)
        Emitter("seller_cancel", data)
        return res.status(200).send({
            "ack": {
              "status": "ACK"
            }
          });
        // var proxy_auth = ""

        // if (req.body.context.bpp_id == process.env.BPP_ID) {
        //     proxy_auth = req.headers["authorization"]?.toString() || "";
        // }

        // CustomLogs.writeRetailLogsToONDC(JSON.stringify(req.body), PROTOCOL_CONTEXT.CANCEL, getSubscriberType(SUBSCRIBER_TYPE.BPP))

        // let query = {
        //     transactionId: req.body.context.transaction_id,
        //     id: req.body.message?.order_id
        // }

        // let orderDetails = await GetBppOrder(query)
        // let flag = true;
        // console.log("orderDetails?.items", orderDetails?.items);
        // if (orderDetails?.items) {
        //     await Promise.all(orderDetails?.items.map(async (item) => {
        //         let product = await getProductById(item?.id)
        //         if (product?.['@ondc/org/cancellable'] != "true" && product?.['@ondc/org/cancellable'] != true) {
        //             flag = false
        //         }

        //         orderDetails.fulfillments.forEach(fulfillment => {
        //             if (item.fulfillment_id == fulfillment.id) {
        //                 if (fulfillment.state.descriptor?.code != "Pending" && fulfillment.state.descriptor?.code != "Packed") {
        //                     flag = false
        //                 }
        //             }
        //         })

        //     }));
        // }


        // if (flag == false) {
        //     return res.status(401)
        //         .setHeader('Proxy-Authenticate', proxy_auth)
        //         .json({
        //             message: {
        //                 "ack": { "status": "NACK" },
        //                 "error": { "type": "Seller App", "code": "50001", "message": "Cancellation not possible" }
        //             }
        //         })
        // }


        // isSignatureValid(proxy_auth, req.body).then(async (isValid) => {
        //     if (!isValid) {

        //         return res.status(401)
        //             .setHeader('Proxy-Authenticate', proxy_auth)
        //             .json({
        //                 message: {
        //                     "ack": { "status": "NACK" },
        //                     "error": { "type": "Seller App", "code": "30016", "message": "Invalid Signature" }
        //                 }
        //             })
        //     } else {
        //         res.status(200).send(messages.getAckResponse(req.body.context));
        //         cancelOrderService.bppOnCancelOrderResponse(req.body, "bap_cancel")
        //     }
        // })
    }
}

export default CancelOrderController;
