import cron from 'node-cron'
import axios from 'axios';
import { encryptCache } from '../cache/encrypt.js';
import { resetCounter } from '../../../subscription/subscription.js';
// import { getCounter } from '../../../subscription/subscription';
function cronInit(key_id){
    cron.schedule('*/9 * * * * *', () => {
        console.log('Running a task every 5 seconds',key_id);
        (async()=>{
            var params = {
               key: key_id,
             };
             
             await axios.get('http://adya-backend-prod.eunimart.com/api/v1/paywalls/subscription_orders/verify', { params })
               .then(response => {
                   var is_authenticated=response.data?.data.is_valid
                   if(is_authenticated){
                    encryptCache(key_id)
                    resetCounter()
                   }
               })
               .catch(error => {
                 console.error("please authorize with valid credentials in cron job",error);
               });
       })()
      }).start();
      
    }
export default cronInit