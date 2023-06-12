// import TrackService from './track.service.js';
// import { isSignatureValid } from '../../shared/utils/cryptic.js';
// import messages from '../../shared/utils/messages.js';
// import CustomLogs from '../../shared/utils/customLogs.js';
// import { PROTOCOL_CONTEXT, SUBSCRIBER_TYPE } from '../../shared/utils/seller_enums.js';
// import { getSubscriberType } from '../../shared/utils/registryApis/registryUtil.js';

// const trackService = new TrackService();
import { setContext } from "../config/global_context.js";
import { Emitter } from "../emitter/emitter.js";
class TrackController {

    /**
    * bpp Track Order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     bppTrackOrder(req, res, next) {
        let data = {
            response: JSON.stringify(req.body),
        }
        setContext(req.body.context)
        Emitter("seller_track", data)
        return res.status(200).send({
            "ack": {
              "status": "ACK"
            }
          });
        // var proxy_auth = ""
        
        // if(req.body.context.bpp_id == process.env.BPP_ID) {
        //     proxy_auth = req.headers["authorization"]?.toString() || "";
        // }
        // CustomLogs.writeRetailLogsToONDC(JSON.stringify(req.body), PROTOCOL_CONTEXT.TRACK,getSubscriberType(SUBSCRIBER_TYPE.BPP))
        
        // isSignatureValid(proxy_auth, req.body).then((isValid) => {
        //     if(!isValid) {
        //         return res.status(401)
        //         .setHeader('Proxy-Authenticate', proxy_auth)
        //         .json({ message : { 
        //                 "ack": { "status": "NACK" },  
        //                 "error": { "type": "Seller App", "code": "30016", "message": "Invalid Signature" } } 
        //             })
        //     } else {
        //         res.status(200).send(messages.getAckResponse(req.body.context));
        //         const end_point = req.body.context.bap_uri;
        //         trackService.bppOnTrackOrderResponse(end_point, req.body);
        //     }
        // })
    }
}

export default TrackController;
