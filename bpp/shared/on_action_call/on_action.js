import HttpRequest from "../utils/HttpRequest.js";
import PROTOCOL_API_URLS from "../utils/protocolApis/routes.js";
import {Configuration} from "../../config/config.js"
import { createAuthorizationHeader } from "../utils/cryptic.js";
import CustomLogs from '../utils/customLogs.js';
import { PROTOCOL_CONTEXT, SUBSCRIBER_TYPE } from '../utils/seller_enums.js';
import { getSubscriberType } from '../utils/registryApis/registryUtil.js';
const bppProtocolOnSearch = async (uri, data) => {
    console.log("-------",uri)
    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);
    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_SEARCH,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );

    CustomLogs.writeRetailLogsToONDC(JSON.stringify(data), PROTOCOL_CONTEXT.ON_SEARCH, getSubscriberType(SUBSCRIBER_TYPE.BPP))

    const result = await apiCall.send();
    console.log("api response--> on_search", result.data);
    return result.data;
}
const bppProtocolOnSelect = async (uri, data) => {

    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);

    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_SELECT,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );

    CustomLogs.writeRetailLogsToONDC(JSON.stringify(data), PROTOCOL_CONTEXT.ON_SELECT, getSubscriberType(SUBSCRIBER_TYPE.BPP))
    const result = await apiCall.send();
    console.log("api response--> on_select", result?.data);
    return result?.data;
}

/**
 * init order
 * @param {Object} data 
 * @returns 
 */
const bppProtocolOnInit = async (uri, data) => {

    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);

    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_INIT,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );

    CustomLogs.writeRetailLogsToONDC(JSON.stringify(data), PROTOCOL_CONTEXT.ON_INIT, getSubscriberType(SUBSCRIBER_TYPE.BPP))

    const result = await apiCall.send();
    console.log("api response--> on_init", result.data);
    return result.data;
}

/**
 * on cancel order
 * @param {Object} data 
 * @returns 
 */
const bppProtocolOnCancel = async (uri, data) => {

    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);

    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_CANCEL,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );

    CustomLogs.writeRetailLogsToONDC(JSON.stringify(data), PROTOCOL_CONTEXT.ON_CANCEL, getSubscriberType(SUBSCRIBER_TYPE.BPP))
    const result = await apiCall.send();
    console.log("api response--> on_cancel", result.data);

    // console.log("result", result)
    return result.data;
}

/**
 * on return order
 * @param {Object} data 
 * @returns 
 */
const bppProtocolOnReturn = async (uri, data) => {

    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);

    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_RETURN,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );
    const result = await apiCall.send();
    return result.data;
}





/**
 * support order
 * @param {Object} data 
 * @returns 
 */
const bppProtocolOnSupport = async (uri, data) => {

    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);

    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_SUPPORT,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );
    CustomLogs.writeRetailLogsToONDC(JSON.stringify(data), PROTOCOL_CONTEXT.ON_SUPPORT, getSubscriberType(SUBSCRIBER_TYPE.BPP))

    const result = await apiCall.send();
    console.log("api response--> on_support", result.data);
    return result.data;
}

/**
 * track order
 * @param {Object} data 
 * @returns 
 */
const bppProtocolOnTrack = async (uri, data) => {

    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);

    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_TRACK,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );
    CustomLogs.writeRetailLogsToONDC(JSON.stringify(data), PROTOCOL_CONTEXT.ON_TRACK, getSubscriberType(SUBSCRIBER_TYPE.BPP))

    const result = await apiCall.send();
    console.log("api response--> on_track", result.data);
    return result.data;
}

/**
 * on update order
 * @param {Object} data 
 * @returns 
 */
const bppProtocolOnUpdate = async (uri, data) => {

    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);

    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_UPDATE,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );

    CustomLogs.writeRetailLogsToONDC(JSON.stringify(data), PROTOCOL_CONTEXT.ON_UPDATE, getSubscriberType(SUBSCRIBER_TYPE.BPP))

    const result = await apiCall.send();
    console.log("api response--> on_update", result.data);
    return result.data;
}

/**
 * on Confirm order
 * @param {Object} data 
 * @returns 
 */

const bppProtocolOnConfirm = async (uri, data) => {
    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);

    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_CONFIRM,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );

    CustomLogs.writeRetailLogsToONDC(JSON.stringify(data), PROTOCOL_CONTEXT.ON_CONFIRM, getSubscriberType(SUBSCRIBER_TYPE.BPP))

    const result = await apiCall.send();
    console.log("api response--> on_confirm", result.data);
    return result.data;
}

/**
 * on update order
 * @param {Object} data 
 * @returns 
 */
const bppProtocolOnStatus = async (uri, data) => {

    const authHeader = await createAuthorizationHeader(data, Configuration.BPP_ID, Configuration.BPP_UNIQUE_KEY_ID, Configuration.BPP_PRIVATE_KEY);

    const apiCall = new HttpRequest(uri,
        PROTOCOL_API_URLS.ON_STATUS,
        "POST",
        {
            ...data
        },
        {
            "Authorization": authHeader,
            "Accept": "application/json"
        }
    );

    CustomLogs.writeRetailLogsToONDC(JSON.stringify(data), PROTOCOL_CONTEXT.ON_STATUS, getSubscriberType(SUBSCRIBER_TYPE.BPP))

    const result = await apiCall.send();
    console.log("api response--> on_status", result.data);
    return result.data;
}

export{
     bppProtocolOnSearch,
     bppProtocolOnSelect,
     bppProtocolOnConfirm,
     bppProtocolOnStatus,
     bppProtocolOnUpdate,
     bppProtocolOnCancel,
     bppProtocolOnInit,
     bppProtocolOnTrack,
     bppProtocolOnSupport
}