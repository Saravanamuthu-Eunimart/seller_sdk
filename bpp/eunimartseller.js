import { Config } from "./config/config.js";
import { eventEmitter } from "./emitter/emitter.js";
import Order from "./api_methods/order.js";
import cronInit from "./shared/utils/cron/cron_job.js";
class EunimartSeller {
  constructor(key_id) {
    this.key_id = key_id
    this.config = new Config(key_id)
    this.order = new Order(key_id)
    this.emitter = eventEmitter
    cronInit(key_id)
  }
  Config(config) {
    // this.config.DbConfig(data.uri)
    this.config.SdkConfig(config)
  }
  Router(app) {
    return this.config.RouterExport(app)
  }
  setCategory(category){
    this.config.setCategoryConfig(category)
  }
}
export default EunimartSeller