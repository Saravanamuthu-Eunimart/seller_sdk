// import SelectOrderService from './selectOrder.service.js';
// import JsonWebToken from '../../../shared/lib/authentication/json-web-token.js'; 
// import messages from '../../../shared/utils/messages.js';
// import CustomLogs from '../../../shared/utils/customLogs.js';
// import { PROTOCOL_CONTEXT, SUBSCRIBER_TYPE } from '../../../shared/utils/seller_enums.js';
// import { getSubscriberType } from '../../../shared/utils/registryApis/registryUtil.js';
// import { isSignatureValid } from '../../../shared/utils/cryptic.js';
// import  ValidateProvider  from '../../../shared/utils/providerValidate.js';

// const validateProvider = new ValidateProvider();

// const selectOrderService = new SelectOrderService();
// const jsonWebToken = new JsonWebToken();
import { setContext } from "../../config/global_context.js";
import { Emitter } from "../../emitter/emitter.js";

class SelectOrderController {

    /**
    * select
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    async  bppSelect(req, res, next) {
        let data = {
            response: JSON.stringify(req.body),
        }
        setContext(req.body.context)
        Emitter("seller_select", data)
        return res.status(200).send({
            "ack": {
              "status": "ACK"
            }
          });
    //     var proxy_auth = ""

    //     if(req.body.context.bpp_id == process.env.BPP_ID) {
    //         proxy_auth = req.headers["authorization"]?.toString() || "";
    //     }

    //     CustomLogs.writeRetailLogsToONDC(JSON.stringify(req.body), PROTOCOL_CONTEXT.SELECT,getSubscriberType(SUBSCRIBER_TYPE.BPP))

    //    isSignatureValid(proxy_auth, req.body).then(async(isValid) => {
    //         if(!isValid) {
    //             return res.status(401)
    //             .setHeader('Proxy-Authenticate', proxy_auth)
    //             .json({ message : { 
    //                     "ack": { "status": "NACK" },  
    //                     "error": { "type": "Seller App", "code": "30016", "message": "Invalid Signature" } } 
    //                 })
    //         } else {
    //             // let validator_response = await selectOrderService.ValidateSelect(req.body)
    //             // if(validator_response){
    //             // return res.status(401).json(validator_response)
    //             // }
    //             let providerCheck = await validateProvider.ProviderValidation(req.body)
    //             if(providerCheck){
    //             return res.status(401).json(providerCheck)
    //             }
    //             res.status(200).send(messages.getAckResponse(req.body.context));
    //             const end_point = req.body.context.bap_uri;
    //             selectOrderService.bppOnSelectResponse(end_point, req, "select");
    //         }
    //    })
    }
    
}

export default SelectOrderController;
