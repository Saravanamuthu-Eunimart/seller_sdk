// import SearchService from './search.service.js';
// import NoRecordFoundError from "../../shared/lib/errors/no-record-found.error.js";
// import { PROTOCOL_CONTEXT, SUBSCRIBER_TYPE } from '../../shared/utils/seller_enums.js';
// import messages from '../../shared/utils/messages.js';
// import {  getProviderByName, searchProductbyName } from "../../shared/db/dbService.js";
// import { getSubscriberType } from "../../shared/utils/registryApis/registryUtil.js";
// import CustomLogs from '../../shared/utils/customLogs.js';
// import { isSignatureValid } from '../../shared/utils/cryptic.js';
// import { State_STD_Codes } from '../../shared/utils/stateSTDCodes.js';
import { Emitter } from '../emitter/emitter.js';
import { setContext } from '../config/global_context.js';
// const searchService = new SearchService();

class SearchController {

    /**
    * search
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    async bppSearch(req, res, next) {
        let data = {
            response: JSON.stringify(req.body),
        }
        setContext(req.body.context)
        Emitter("seller_search", data)
        return res.status(200).send({
            "ack": {
              "status": "ACK"
            }
          });
        var proxy_auth = ""
        // console.log("searchRequest =========> INSIDE BPP search ",req.body);

        if (req.body.context.bpp_id == process.env.BPP_ID) {
            proxy_auth = req.headers["authorization"]?.toString() || "";
        } else {
            proxy_auth = req.headers["x-gateway-authorization"]?.toString() || "";
        }

        const root = this

        CustomLogs.writeRetailLogsToONDC(JSON.stringify(req.body), PROTOCOL_CONTEXT.SEARCH, getSubscriberType(SUBSCRIBER_TYPE.BPP))

        isSignatureValid(proxy_auth, req.body, SUBSCRIBER_TYPE.BG).then(async (isValid) => {
            if (!isValid) {
                return res.status(401)
                    .setHeader('Proxy-Authenticate', proxy_auth)
                    .json({
                        message: {
                            "ack": { "status": "NACK" },
                            "error": { "type": "Gateway", "code": "10001", "message": "Invalid Signature" }
                        }
                    })
            } else {
                let cityMapping = State_STD_Codes.find(x => {
                    if (x.code === req.body.context.city) {
                        return x
                    }
                })
                var location = req?.body?.message?.intent?.fulfillment?.end?.location?.gps || cityMapping?.gps
                var provider_string = req?.body?.message?.intent?.provider?.id || req?.body?.message?.intent?.provider?.descriptor?.name
                var providers_meta_data = await searchService.bppProductMetaCheck(location);

                // console.log("Provider Details =========>>>> ", JSON.stringify(providers_meta_data));

                if (providers_meta_data.length < 1) {

                    return res.status(401)
                        .setHeader('Proxy-Authenticate', proxy_auth)
                        .json({
                            message: {
                                "ack": { "status": "NACK" },
                                "error": { "type": "Gateway", "code": "10001", "message": "Invalid Signature" }
                            }
                        })
                }
                let new_providers_meta_data = []
                if (provider_string) {
                    let providers = await getProviderByName(provider_string) //Client should give api
                    for (let provider of providers_meta_data) {
                        delete provider["_id"]
                        let obj = providers.find(prov => prov.id === provider.id);
                        if (obj) {
                            let obj1 = new_providers_meta_data.find(prov =>{ prov.id === obj.id});
                            if (!obj1) {
                            new_providers_meta_data.push(provider)
                            }
                        }
                        else{

                        }
                    }
                }

                res.status(200).send(messages.getAckResponse(req.body.context));

                const end_point = proxy_auth ? process.env.PROTOCOL_BASE_URL : req.body.context.bap_uri;
                if (new_providers_meta_data.length) {
                    searchService.bppOnSearchResults(end_point, req, "search", new_providers_meta_data);

                } else {
                    searchService.bppOnSearchResults(end_point, req, "search", providers_meta_data);
                }
            }
        })
    }

    /**
    * search
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    bppOnSearch(req, res, next) {
        const searchRequest = req.body;

        searchService.bppOnSearch(searchRequest).then(response => {
            if (!response || response === null)
                throw new NoRecordFoundError("No result found");
            else
                res.json(response);
        }).catch((err) => {
            next(err);
        });
    }
}

export default SearchController;
