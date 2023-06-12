import { Router } from 'express';
import bppRoutes from '../router.js'
import { setContext } from './global_context.js';
import {Authentication} from '../auth/auth.js';
// import cronInit from '../shared/utils/cron/cron_job.js';
// import dbConnect from '../../shared/database/mongooseConnector.js';
const router = new Router();

var routes={}
var Configuration={}
var Category={}
class Config {
    constructor(key_id) {
        this.key_id = key_id
        // this.secret_key = secret_key
    }
    RouterExport(app) {
        if (Authentication(`${this.key_id}`)) {
            router.use(bppRoutes);
            app.use(router)
            // return router
        }else{
            console.log("please authorize with valid credentials")
        }
    }
    SdkConfig(user) {
        // config.forEach((user) => {
            Configuration["BPP_ID"]=user.subscriber_id
            Configuration["BPP_UNIQUE_KEY_ID"]=user.bpp_unique_key_id
            Configuration["BPP_PRIVATE_KEY"]=user.bpp_signing_key?.private_key
            Configuration["BPP_URL"]=user.bpp_url
            Configuration["HOST_URL"]=user?.bap_url
            Configuration["BG_ID"]="prod.gateway.ondc.org"
            Configuration["PROTOCOL_BASE_URL"]="https://prod.gateway.ondc.org/"
            Configuration["DOMAIN"]="nic2004:52110"
            Configuration["COUNTRY"]="IND"
            Configuration["CITY"]="std:080"
            Configuration["CORE_VERSIOIN"]="1.1.0"
            Configuration["TTL"]="P1M"
            Configuration["REGISTRY_BASE_URL"]= user?.registry_url || "https://prod.registry.ondc.org/"
            setContext({
                "bpp_id":Configuration.BPP_ID,
                "bpp_uri":Configuration.BPP_URL
            })
            // const api_data=user?.api
            // api_data.forEach((endpoint)=>{
            //     routes[endpoint?.name]=endpoint?.http_entity_endpoint
            // })
        //   });
    }
    setCategoryConfig(category) {
        Category = category
        // config.forEach((user) => {
            // Category["f&b"]=category["f&b"]
            // Category["fashion"]=category["fashion"]
            // Category["grocery"]=category["grocery"]
            // const api_data=user?.api
            // api_data.forEach((endpoint)=>{
            //     routes[endpoint?.name]=endpoint?.http_entity_endpoint
            // })
        //   });
    }

}
export { Config, Configuration,Category,routes };