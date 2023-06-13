import axios from "axios";
import Mappers from '../shared/mapper/dynamic_mapper.js'
import {getCounter, setCounter} from '../subscription/subscription.js'
// import temp from "../mapper/on_select.js";
import {PayloadConstructor, PayloadConstructorVersion2} from '../mapper/mapper.js'
const payloadConstructor=new PayloadConstructor()
// const payloadConstructorV2=new PayloadConstructorVersion2()
const mappers=new Mappers()
import {Authentication} from "../auth/auth.js";   
class Order{
  constructor(key_id){
    this.key_id=key_id
    // this.secret_key=secret_key
  }
async Search(payload,mapping,callback){
  if (Authentication(`${this.key_id}`)) {
    setCounter()
        await axios.get(payload.http_entity_endpoint)
      .then(async function (response) {
        const data=mappers.searchMapper(mapping,response.data)

        if (data?.context?.core_version == "1.1.1"){
          callback(await payloadConstructor.searchMapper(data),null)
        }
        // else if(data?.context?.core_version == "1.1.2"){
        //   callback(await payloadConstructorV2.searchMapper(data),null)
        // }
      })
      .catch(function (error) {
        callback(null,error)
      });
    } else{
      console.log("please authorize with valid credentials--- in search")
  }
}

async Select(payload,mapping,callback){
  if (Authentication(`${this.key_id}`)) {
    setCounter()
        await axios.get(payload.http_entity_endpoint)
      .then(async function (response) {
        const data=mappers.commonMapper(mapping,response.data)
        // var temporary={
        //   "provider": data.provider,
        //   "fulfillments": data.fulfillments,
        //   "quote": data.quote,
        //   "items": data.items

        // }
        if (data?.context?.core_version == "1.1.1"){ 
          callback(await payloadConstructor.selectMapper(data),null)
        }
        // callback(data,null)
      })
      .catch(function (error) {
        callback(null,error)
      });
    } else{
      console.log("please authorize with valid credentials")
  }
}
async Init(payload,mapping,callback){
  if (Authentication(`${this.key_id}`)) {
    setCounter()
  await axios.get(payload.http_entity_endpoint)
.then(async function (response) {
  const data=mappers.commonMapper(mapping,response.data)
  if (data?.context?.core_version == "1.1.1"){ 
    callback(await payloadConstructor.initMapper(data),null)
  }
  // callback(data,null)
})
.catch(function (error) {
  callback(null,error)
});
} else{
  console.log("please authorize with valid credentials")
}
}
async Confirm(payload,mapping,callback){
  if (Authentication(`${this.key_id}`)) {
    setCounter()
  await axios.get(payload.http_entity_endpoint)
.then(async function (response) {
  const data=mappers.commonMapper(mapping,response.data)
  // var temporary={
  //   "order_id": data.order_id,
  //   "bpp_descriptor": data.bpp_descriptor,
  //   "bpp_providers": data.bpp_providers
  // }
  // console.log("-----",JSON.stringify(data))
  if (data?.context?.core_version == "1.1.1"){ 
    callback(await payloadConstructor.confirmMapper(data),null)
  }
  // callback(data,null)
})
.catch(function (error) {
  callback(null,error)
});
} else{
  console.log("please authorize with valid credentials")
}
}
async Status(payload,mapping,callback){
  if (Authentication(`${this.key_id}`)) {
    setCounter()
  await axios.get(payload.http_entity_endpoint)
.then(async function (response) {
  const data=mappers.commonMapper(mapping,response.data)
  if (data?.context?.core_version == "1.1.1"){ 
    callback(await payloadConstructor.statusMapper(data),null)
  }
  // callback(data,null)
})
.catch(function (error) {
  callback(null,error)
});
} else{
  console.log("please authorize with valid credentials")
}
}

async Update(payload,mapping,callback){
  if (Authentication(`${this.key_id}`)) {
    setCounter()
  await axios.get(payload.http_entity_endpoint)
.then(async function (response) {
  const data=mappers.commonMapper(mapping,response.data)
  if (data?.context?.core_version == "1.1.1"){ 
    callback(await payloadConstructor.updateMapper(data),null)
  }
  // callback(data,null)
})
.catch(function (error) {
  callback(null,error)
});
} else{
  console.log("please authorize with valid credentials")
}
}

async Cancel(payload,mapping,callback){
  if (Authentication(`${this.key_id}`)) {
    setCounter()
  await axios.get(payload.http_entity_endpoint)
.then(async function (response) {
  const data=mappers.commonMapper(mapping,response.data)
  if (data?.context?.core_version == "1.1.1"){ 
    callback(await payloadConstructor.cancelMapper(data),null)
  }
  // callback(data,null)
})
.catch(function (error) {
  callback(null,error)
});
} else{
  console.log("please authorize with valid credentials")
}
}

async Support(payload,mapping,callback){
  if (Authentication(`${this.key_id}`)) {
    setCounter()
  await axios.get(payload.http_entity_endpoint)
.then(async function (response) {
  const data=mappers.commonMapper(mapping,response.data)
  if (data?.context?.core_version == "1.1.1"){ 
    callback(await payloadConstructor.supportMapper(data),null)
  }
  // callback(data,null)
})
.catch(function (error) {
  callback(null,error)
});
} else{
  console.log("please authorize with valid credentials")
}
}

async Track(payload,mapping,callback){
  if (Authentication(`${this.key_id}`)) {
    setCounter()
  await axios.get(payload.http_entity_endpoint)
.then(async function (response) {
  const data=mappers.commonMapper(mapping,response.data)
  if (data?.context?.core_version == "1.1.1"){ 
    callback(await payloadConstructor.trackMapper(data),null)
  }
  // callback(data,null)
})
.catch(function (error) {
  callback(null,error)
});
} else{
  console.log("please authorize with valid credentials")
}
}
}

export default Order