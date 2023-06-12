// import InitOrderService from './initOrder.service.js';
// import { isSignatureValid } from '../../../shared/utils/cryptic.js';
// import messages from '../../../shared/utils/messages.js';
// import CustomLogs from '../../../shared/utils/customLogs.js';
// import { PROTOCOL_CONTEXT, SUBSCRIBER_TYPE } from '../../../shared/utils/seller_enums.js';
// import { getSubscriberType } from '../../../shared/utils/registryApis/registryUtil.js';
// import { getBPPCartByTransactionId } from '../../../shared/db/dbService.js';
// import  ValidateProvider  from '../../../shared/utils/providerValidate.js';

// const validateProvider = new ValidateProvider();
// const initOrderService = new InitOrderService();

import { setContext } from "../../config/global_context.js";
import { Emitter } from "../../emitter/emitter.js";

class InitOrderController {

    /**
    * select
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     async bppInitOrder(req, res, next) {
        let data = {
            response: JSON.stringify(req.body),
        }
        setContext(req.body.context)
        Emitter("seller_init", data)
        return res.status(200).send({
            "ack": {
              "status": "ACK"
            }
          });
        // var proxy_auth = ""

        // if(req.body.context.bpp_id == process.env.BPP_ID) {
        //     proxy_auth = req.headers["authorization"]?.toString() || "";
        // }
       

        // CustomLogs.writeRetailLogsToONDC(JSON.stringify(req.body), PROTOCOL_CONTEXT.INIT,getSubscriberType(SUBSCRIBER_TYPE.BPP))

        // isSignatureValid(proxy_auth, req.body).then(async(isValid) => {
        //     if(!isValid) {
        //         return res.status(401)
        //         .setHeader('Proxy-Authenticate', proxy_auth)
        //         .json({ message : { 
        //                 "ack": { "status": "NACK" },  
        //                 "error": { "type": "Seller App", "code": "30016", "message": "Invalid Signature" } } 
        //             })
        //     } else {
        //         // let message = await initOrderService.ValidateProviderInitNack(req.body)
        //         // if(message){
        //         // return res.status(401).json(message)
        //         // }
        //         let providerCheck = await validateProvider.ProviderValidation(req.body)
        //         if(providerCheck){
        //             return res.status(401).json(providerCheck)
        //             }
        //         res.status(200).send(messages.getAckResponse(req.body.context));
        //         const end_point = req.body.context.bap_uri;
        //         initOrderService.bppOnInitOrderResponse(end_point, req.body);
        //     }
        // })
    }
}

export default InitOrderController;
