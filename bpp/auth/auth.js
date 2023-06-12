import axios from "axios";
import { decryptCache,encryptCache } from "../shared/utils/cache/encrypt.js";
import { getCounter } from "../subscription/subscription.js";
var is_authenticated
function Authentication(key_id){
    if(key_id && is_authenticated==undefined){
        (async()=>{
             var params = {
                key: key_id,
              };
              await axios.get('http://adya-backend-prod.eunimart.com/api/v1/paywalls/subscription_orders/verify', { params })
                .then(response => {
                    is_authenticated=response.data?.data.is_valid
                    encryptCache(key_id)
                })
                .catch(error => {
                  console.error("please authorize with valid credentials jsahjahsj");
                });
        })()
        return true
    }else if(is_authenticated){
        var data=decryptCache()
        console.log("=====",data)
        if(data){
            if((data?.counter+getCounter())>data?.total_count){
                is_authenticated=false
                return false
            }
        }
        console.log("====== in else if",data)
        return is_authenticated
    }
    else{
        is_authenticated=undefined
        return false
    }
}
export {Authentication,is_authenticated}