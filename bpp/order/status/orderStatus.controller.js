// import OrderStatusService from './orderStatus.service.js';
// import BadRequestParameterError from '../../../shared/lib/errors/bad-request-parameter.error.js';
// import { isSignatureValid } from '../../../shared/utils/cryptic.js';
// import messages from '../../../shared/utils/messages.js';
// import CustomLogs from '../../../shared/utils/customLogs.js';
// import { PROTOCOL_CONTEXT, SUBSCRIBER_TYPE } from '../../../shared/utils/seller_enums.js';
// import { getSubscriberType } from '../../../shared/utils/registryApis/registryUtil.js';
// import { v4 as uuidv4 } from 'uuid';
// import { kafkaClusters, produceKafkaEvent } from "../../../shared/eda/kafka.js";
// import { topics } from '../../../shared/eda/consumerInit/initConsumer.js';

// const orderStatusService = new OrderStatusService();
import { setContext } from "../../config/global_context.js";
import { Emitter } from "../../emitter/emitter.js";

class OrderStatusController {

    /**
    * bpp Update Order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    async bppStatusOrder(req, res, next) {
        let data = {
            response: JSON.stringify(req.body),
        }
        setContext(req.body.context)
        Emitter("seller_status", data)
        return res.status(200).send({
            "ack": {
              "status": "ACK"
            }
          });
        // var proxy_auth = ""

        // if (req.body.context.bpp_id == process.env.BPP_ID) {
        //     proxy_auth = req.headers["authorization"]?.toString() || "";
        // }

        // CustomLogs.writeRetailLogsToONDC(JSON.stringify(req.body), PROTOCOL_CONTEXT.STATUS, getSubscriberType(SUBSCRIBER_TYPE.BPP))

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
        //     } else {
        //         res.status(200).send(messages.getAckResponse(req.body.context));
        //         orderStatusService.bppOnStatusOrderResponse(req.body);

        //     }
        // })
    }

}

export default OrderStatusController;
