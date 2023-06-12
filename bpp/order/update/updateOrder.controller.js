// import UpdateOrderService from './updateOrder.service.js';
// import BadRequestParameterError from '../../../shared/lib/errors/bad-request-parameter.error.js';
// import { isSignatureValid } from '../../../shared/utils/cryptic.js';
// import messages from '../../../shared/utils/messages.js';
// import { getOrderById, getOrderByTransactionId, getProductById } from '../../../shared/db/dbService.js';
// import CustomLogs from '../../../shared/utils/customLogs.js';
// import { PROTOCOL_CONTEXT, SUBSCRIBER_TYPE } from '../../../shared/utils/seller_enums.js';
// import { getSubscriberType } from '../../../shared/utils/registryApis/registryUtil.js';
// import { topics } from '../../../shared/eda/consumerInit/initConsumer.js';
// import { v4 as uuidv4 } from 'uuid';
// import { kafkaClusters, produceKafkaEvent } from "../../../shared/eda/kafka.js";
// import { GetBppOrder, UpdateBppOrder } from '../../../shared/db/bpp_dbService.js';

// const updateOrderService = new UpdateOrderService();
import { setContext } from "../../config/global_context.js";
import { Emitter } from "../../emitter/emitter.js";

class UpdateOrderController {

    /**
    * bpp Update Order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    async bppUpdateOrder(req, res, next) {
        let data = {
            response: JSON.stringify(req.body),
        }
        setContext(req.body.context)
        Emitter("seller_update", data)
        return res.status(200).send({
            "ack": {
              "status": "ACK"
            }
          });
        // var proxy_auth = ""

        // if (req.body.context.bpp_id == process.env.BPP_ID) {
        //     proxy_auth = req.headers["authorization"]?.toString() || "";
        // }

        // CustomLogs.writeRetailLogsToONDC(JSON.stringify(req.body), PROTOCOL_CONTEXT.UPDATE, getSubscriberType(SUBSCRIBER_TYPE.BPP))

        // let query = {
        //     transactionId: req.body.context.transaction_id,
        //     id: req.body.message?.order?.id
        // }

        // let orderDetails = await GetBppOrder(query)
        // let flag = true;

        // await Promise.all(req?.body?.message?.order?.items.map(async (item) => {

        //     let product = await getProductById(item?.id)

        //     if (item?.tags?.update_type == "cancel") {
        //         if (product?.['@ondc/org/cancellable'] != "true" && product?.['@ondc/org/cancellable'] != true) {
        //             flag = false
        //         }

        //         let obj = orderDetails.items.find(order_item => order_item.id === item.id)
        //         orderDetails.fulfillments.forEach(fulfillment => {
        //             if (obj.fulfillment_id == fulfillment.id) {
        //                 if (fulfillment.state.descriptor?.code != "Pending" && fulfillment.state.descriptor?.code != "Packed") {
        //                     flag = false
        //                 }
        //             }
        //         })
        //     }
        //     if (item?.tags?.update_type == "return") {
        //         if (product?.['@ondc/org/returnable'] != "true" && product?.['@ondc/org/returnable'] != true) {
        //             flag = false
        //         }
        //         orderDetails.fulfillments.forEach(fulfillment => {
        //             if (item.fulfillment_id == fulfillment.id) {
        //                 if (fulfillment.state.descriptor?.code != "Order-delivered") {
        //                     flag = false
        //                 }
        //             }
        //         })
        //     }

        // }));

        // if (flag == false) {
        //     return res.status(401)
        //         .setHeader('Proxy-Authenticate', proxy_auth)
        //         .json({
        //             message: {
        //                 "ack": { "status": "NACK" },
        //                 "error": { "type": "Seller App", "code": "50001", "message": "Cancellation not possible" }
        //             }
        //         })
        // };

        // await UpdateBppOrder(query, { updateRequest: req.body });

        // isSignatureValid(proxy_auth, req.body).then((isValid) => {
        //     if (!isValid) {
        //         return res.status(401)
        //             .setHeader('Proxy-Authenticate', proxy_auth)
        //             .json({
        //                 message: {
        //                     "ack": { "status": "NACK" },
        //                     "error": { "type": "Seller App", "code": "30016", "message": "Invalid Signature" }
        //                 }
        //             })
        //     }
        //     else {
        //         res.status(200).send(messages.getAckResponse(req.body.context));
        //         // if(!req.body?.message?.order?.payment&& req.body?.message?.update_target == "item"){
        //         const end_point = req.body.context.bap_uri;
        //         updateOrderService.bppOnUpdateOrderResponse(end_point, "bap_partial_cancel", req.body);
        //         // }
        //     }
        // })

    }

}

export default UpdateOrderController;
