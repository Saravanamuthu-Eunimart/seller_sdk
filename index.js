// import {eunimartbuyer} from './bundle/bundle.js'
// const {eunimartbuyer}=require('./bundle/bundle.js')
// // import Eunimart from 'test-one-eunimart'
// const bodyParser=require('body-parser')
// const cors=require('cors')
// const express=require('express')
// import EunimartSeller from "./bpp/eunimartseller";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import temp from "./bpp/mapper/on_search_payload.js";
// import EventEmitter from 'events';
// const eventEmitter = new EventEmitter();
import EunimartSeller from "./bpp/eunimartseller.js";


// const cors=require('cors')
// const express=require('express')
// const temp=require('./bpp/mapper/on_update.js')
// const EunimartSeller=require('./bundle/bundle.js')
// const bodyParser=require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
try {
  const dbPort = 8081
  var server = app.listen(dbPort, () => {
    console.info(`Listening on port ${dbPort}`);
  });
} catch (error) {
  console.log(error)
  process.exit(1)
}
app.use(cors());
var data = {
  "context":
  {
    "domain": "nic2004:52110",
    "action": "search",
    "country": "IND",
    "city": "std:011",
    "core_version": "1.1.0",
    "bap_id": "buyerapp.com",
    "bap_uri": "https://buyerapp.com/ondc",
    "transaction_id": "3df395a9-c196-4678-a4d1-5eaf4f7df8dc",
    "message_id": "1655281254860",
    "timestamp": "2023-02-03T08:00:00.000Z",
    "ttl": "PT30S"
  },
  "message":
  {
    "intent":
    {
      "fulfillment":
      {
        "type": "Delivery"
      },
      "payment":
      {
        "@ondc/org/buyer_app_finder_fee_type": "percent",
        "@ondc/org/buyer_app_finder_fee_amount": "3"
      }
    }
  }
}
var category_object = {
  // "fashion":"f&b",
  // "f&b":"Home Improvement",
  // "grocery":"gross"
  // "Fruits and Vegetables": "f&v",
  "Home Improvement": "f&v",
  "Masala & Seasoning": "m&s",
  "Oil & Ghee": "o&g",
  "Gourmet & World Foods": "",
  "Foodgrains": "",
  "Eggs, Meat & Fish": "",
  "Cleaning & Household": "",
  "Beverages": "",
  "Beauty & Hygiene": "",
  "Bakery, Cakes & Dairy": "",
  "Kitchen Accessories": "",
  "Baby Care": "",
  "Snacks & Branded Foods": "",
  "Pet Care": "",
  "Stationery": ""
}

app.get('/temp_data', async (req, res) => {
  res.json(temp)
})
app.post('/on_search', async (req, res) => {
  console.log("------- on search")
})
app.post('/on_select', async (req, res) => {
  console.log("------- on select", JSON.stringify(req.body))
})
app.post('/on_confirm', async (req, res) => {
  console.log("------- on confirm", JSON.stringify(req.body))
})
// app.post('/search',async(req,res)=>{
// eventEmitter.emit("seller_search",data)
// res.json({"message":"success"})

// }
// )
var sdk = new EunimartSeller("dd6cb1b43c9d49e7e6787eeb87db20fb510c276f79fc7e82619a2f4e1047a4a2")
sdk.Router(app)
sdk.Config({
  "subscriber_id": "ondc.eunimart.com",
  "bpp_url": "https://ondc.eunimart.com/api/v1/ondc/bpp/eunimart_bpp",
  "bpp_unique_key_id": "88b1d6da-c4d4-4b92-9b38-e8798d4d1570",
  "bpp_encryption_key": {
    "private_key": "88b1d6da-c4d4-4b92-9b38-e8798d4d1570",
    "public_key": ""
  },
  "bpp_signing_key": {
    "private_key": "SvakKoStSK/hXXNQiqPqm4x06mPhbCW3qyVjISgK5ESvGs1Wh9kTptANLRg7xyPfa2ECVJ28mtXMjjY7ciu4mw==",
    "public_key": ""
  },
  "domain": "nic2004:52110",
  "country": "IND",
  "city": "std:080",
  "core_version": "1.1.0",
  "ttl": "P1M",
  "gateway_url": "prod.gateway.ondc.org",
  "registry_url": "",
});
sdk.setCategory(category_object)
// app.use("/eunimart_bap", cors(),bap.Router());
const test = async () => {
  sdk.emitter.on("seller_search", function (data) {
    sdk.order.Search(
      {
        "name": "search",
        "http_entity_endpoint": "http://localhost:8081/temp_data",
        "http_timeout": 8000,
        "http_retry_count": 0,
        "header_validity": 600000,
        "header_authentication": true,
        "set_authorization_header": true
      },
      {
        "bpp_descriptor": {
          "name": "bpp_descriptor.name",
          "symbol": "bpp_descriptor.symbol",
          "short_desc": "bpp_descriptor.short_desc",
          "long_desc": "bpp_descriptor.long_desc",
          "images": "bpp_descriptor.images"
        },
        "bpp_providers": [
          {
            "id": "bpp_providers.id",
            "time": "bpp_providers.time",
            "descriptor": "bpp_providers.descriptor",
            "@ondc/org/fssai_license_no": "bpp_providers.fssai_license_no",
            "ttl": "bpp_providers.ttl",
            "locations": [
              {
                "id": "bpp_providers.locations.id",
                "gps": "bpp_providers.locations.gps",
                "address": "bpp_providers.locations.address",
                "circle": {
                  "gps": "bpp_providers.locations.circle.gps",
                  "radius": "bpp_providers.locations.circle.radius"
                },
                "time": {
                  "days": "bpp_providers.locations.time.days",
                  "schedule": "bpp_providers.locations.time.schedule",
                  "range": "bpp_providers.locations.time.range"
                }
              }
            ],
            "items": [
              {
                "id": "bpp_providers.items.id",
                "descriptor": "bpp_providers.items.descriptor",
                "quantity_available": "bpp_providers.items.quantity.available.count",
                "quantity_maximum": "bpp_providers.items.quantity.maximum.count",
                "price": "bpp_providers.items.price",
                "category_id": "bpp_providers.items.category_id",
                "fulfillment_id": "bpp_providers.items.fulfillment_id",
                "location_id": "bpp_providers.items.location_id",
                "recommended": "bpp_providers.items.recommended",
                "@ondc/org/returnable": "bpp_providers.items.returnable",
                "@ondc/org/cancellable": "bpp_providers.items.cancellable",
                "@ondc/org/return_window": "bpp_providers.items.return_window",
                "@ondc/org/seller_pickup_return": "bpp_providers.items.seller_pickup_return",
                "@ondc/org/time_to_ship": "bpp_providers.items.time_to_ship",
                "@ondc/org/available_on_cod": "bpp_providers.items.available_on_cod",
                "@ondc/org/contact_details_consumer_care": "bpp_providers.items.contact_details_consumer_care",
                "tags": "bpp_providers.items.tags",
                "test": "bpp_providers.items.time_to_ship",
                "@ondc/org/statutory_reqs_packaged_commodities": {
                  "manufacturer_or_packer_name": "bpp_providers.items.time_to_ship",
                  "manufacturer_or_packer_address": "bpp_providers.items.time_to_ship",
                  "common_or_generic_name_of_commodity": "bpp_providers.items.time_to_ship",
                  "net_quantity_or_measure_of_commodity_in_pkg": "bpp_providers.items.time_to_ship",
                  "month_year_of_manufacture_packing_import": "bpp_providers.items.time_to_ship",
                  "imported_product_country_of_origin": "bpp_providers.items.time_to_ship"
                },
                "@ondc/org/statutory_reqs_prepackaged_food": {
                  "nutritional_info": "bpp_providers.items.time_to_ship",
                  "additives_info": "bpp_providers.items.time_to_ship",
                  "brand_owner_FSSAI_license_no": "bpp_providers.items.time_to_ship",
                  "other_FSSAI_license_no": "bpp_providers.items.time_to_ship",
                  "importer_FSSAI_license_no": "bpp_providers.items.time_to_ship",
                  "imported_product_country_of_origin": "bpp_providers.items.time_to_ship"
                },
                "@ondc/org/mandatory_reqs_veggies_fruits": {
                  "net_quantity": "bpp_providers.items.time_to_ship"
                },
              }
            ],
            "fulfillments": [{
              "contact": "bpp_providers.fulfillments.contact"
            }
            ],

            "tags": [
              {
                "list": "bpp_providers.tags.list"
              }
            ]
          }
        ],
        "bpp_fulfillments": "bpp_fulfillments",
      },
      async function (data, err) {
        // console.log(JSON.stringify(data),err)
      },
    )
  })



  // sdk.emitter.on("seller_init",function(data){
  //   sdk.order.Init(
  //     {
  //       "name": "search",
  //       "http_entity_endpoint": "http://localhost:8081/temp_data",
  //       "http_timeout": 8000,
  //       "http_retry_count": 0,
  //       "header_validity": 600000,
  //       "header_authentication": true,
  //       "set_authorization_header": true
  //     },{
  //       "provider": "provider.id",
  //       "provider_location": "provider_location.id",
  //       "items": [
  //           {
  //               "id": "items.id",
  //               "fulfillment_id": "items.fulfillment_id",
  //               "quantity": "items.quantity.count"
  //           }
  //       ],
  //       "billing": {
  //           "name": "billing.name",
  //           "locality": "billing.address.locality",
  //           "building": "billing.address.building",
  //           "city": "billing.address.city",
  //           "state": "billing.address.state",
  //           "country": "billing.address.country",
  //           "area_code": "billing.address.area_code",
  //           "phone": "billing.phone",
  //           "email": "billing.email",
  //           "created_at": "billing.created_at",
  //           "updated_at": "billing.updated_at"
  //       },
  //       "fulfillments": [
  //           {
  //               "id": "fulfillments.id",
  //               "type": "fulfillments.type",
  //               "provider_id": "fulfillments.provider_id",
  //               "tracking": "fulfillments.tracking",
  //               "end": {
  //                   "gps": "fulfillments.end.location.gps",
  //                   "address": {
  //                       "name": "fulfillments.end.location.address.name",
  //                       "door": "fulfillments.end.location.address.door",
  //                       "building": "fulfillments.end.location.address.building",
  //                       "locality": "fulfillments.end.location.address.locality",
  //                       "city": "fulfillments.end.location.address.city",
  //                       "state": "fulfillments.end.location.address.state",
  //                       "country": "fulfillments.end.location.address.country",
  //                       "area_code": "fulfillments.end.location.address.area_code"
  //                   },
  //                   "contact": "fulfillments.end.contact.phone"
  //               }
  //           }
  //       ],
  //       "quote": {
  //           "price": "quote.price",
  //           "breakup": [
  //               {
  //                   "@ondc/org/item_id": "quote.breakup.item_id",
  //                   "@ondc/org/item_quantity": "quote.breakup.item_quantity",
  //                   "title": "quote.breakup.title",
  //                   "@ondc/org/title_type": "quote.breakup.title_type",
  //                   "price": "quote.breakup.price",
  //                   "item": "quote.breakup.item"
  //               }
  //           ],
  //           "ttl": "quote.ttl"
  //       },
  //       "settlement_details": [
  //           {
  //               "upi_address": "payment.settlement_details.upi_address",
  //               "settlement_counterparty": "payment.settlement_details.settlement_counterparty",
  //               "settlement_phase": "payment.settlement_details.settlement_phase",
  //               "settlement_type": "payment.settlement_details.settlement_type",
  //               "beneficiary_name": "payment.settlement_details.beneficiary_name",
  //               "settlement_bank_account_no": "payment.settlement_details.settlement_bank_account_no",
  //               "settlement_ifsc_code": "payment.settlement_details.settlement_ifsc_code",
  //               "bank_name": "payment.settlement_details.bank_name",
  //               "branch_name": "payment.settlement_details.branch_name"
  //           }
  //       ],
  //       "buyer_app_finder_fee_amount": "payment.buyer_app_finder_fee_amount",
  //       "buyer_app_finder_fee_type": "payment.buyer_app_finder_fee_type",

  //   },
  //         async function(data,err){
  //           console.log(JSON.stringify(data),err)
  //         },
  //         )
  //       })


  // sdk.emitter.on("seller_select",function(data){
  //   sdk.order.Select(
  //     {
  //       "name": "search",
  //       "http_entity_endpoint": "http://localhost:8081/temp_data",
  //       "http_timeout": 8000,
  //       "http_retry_count": 0,
  //       "header_validity": 600000,
  //       "header_authentication": true,
  //       "set_authorization_header": true
  //     },{
  //       "provider": "provider.id",
  //       "items": [
  //         {
  //           "fulfillment_id": "items.fulfillment_id",
  //           "id": "items.id"
  //         }
  //       ],
  //       "fulfillments": [
  //         {
  //           "id": "fulfillments.id",
  //           "@ondc/org/provider_name": "fulfillments.provider_name",
  //           "tracking": "fulfillments.tracking",
  //           "@ondc/org/category": "fulfillments.category",
  //           "@ondc/org/TAT": "fulfillments.TAT",
  //           "state": "fulfillments.state.descriptor.code"
  //         }
  //       ],
  //       "quote": {
  //         "price": {
  //           "currency": "quote.price.currency",
  //           "value": "quote.price.value"
  //         },
  //         "breakup": [{
  //           "@ondc/org/item_id": "quote.breakup.item_id",
  //           "@ondc/org/item_quantity": "quote.breakup.item_quantity",
  //           "title": "quote.breakup.title",
  //           "@ondc/org/title_type": "quote.breakup.title_type",
  //           "price": "quote.breakup.price",
  //           "item": {
  //             "quantity_available": "quote.breakup.item.qty_available",
  //             "quantity_maximum": "quote.breakup.item.qty_maximum",
  //             "price": "quote.breakup.item.price"
  //           }
  //         }],
  //         "ttl": "quote.ttl"
  //       }
  //     },
  //         async function(data,err){
  //           console.log(JSON.stringify(data),err)
  //         },
  //         )
  //       })

  // sdk.emitter.on("seller_confirm",function(data){
  //   sdk.order.Confirm(
  //     {
  //       "name": "search",
  //       "http_entity_endpoint": "http://localhost:8081/temp_data",
  //       "http_timeout": 8000,
  //       "http_retry_count": 0,
  //       "header_validity": 600000,
  //       "header_authentication": true,
  //       "set_authorization_header": true
  //     },
  //     {
  //       "order_id": "id",
  //       "state": "state",
  //       "billing": {
  //           "name": "billing.name",
  //           "address_name":"address name",
  //           "locality": "billing.address.locality",
  //           "building": "billing.address.building",
  //           "door":"billing.address.door",
  //           "city": "billing.address.city",
  //           "state": "billing.address.state",
  //           "country": "billing.address.country",
  //           "area_code": "billing.address.area_code",
  //           "phone": "billing.phone",
  //           "email": "billing.email",
  //           "created_at": "billing.created_at",
  //           "updated_at": "billing.updated_at"
  //       },
  //       "items": [
  //           {
  //               "id": "items.id",
  //               "quantity":{
  //                       "count":"items.quantity.count"
  //                   },
  //               "fulfillment_id": "items.fulfillment_id"
  //           }
  //       ],
  //       "provider_id": "provider.id",
  //       "locations": [
  //           {
  //               "id": "provider.locations.id"
  //           }
  //       ],
  //       "payment":{
  //         "amount": "payment.params.amount",
  //         "currency": "payment.params.currency",
  //         "transaction_id": "payment.params.transaction_id",
  //         "status": "payment.status",
  //         "type": "payment.type",
  //         "collected_by": "payment.collected_by",
  //         "buyer_app_finder_fee_amount": "payment.buyer_app_finder_fee_amount",
  //         "buyer_app_finder_fee_type": "payment.buyer_app_finder_fee_type",
  //         "settlement_details": [
  //           {
  //               "upi_address": "payment.settlement_details.upi_address",
  //               "settlement_counterparty": "payment.settlement_details.settlement_counterparty",
  //               "settlement_phase": "payment.settlement_details.settlement_phase",
  //               "settlement_type": "payment.settlement_details.settlement_type",
  //               "beneficiary_name": "payment.settlement_details.beneficiary_name",
  //               "settlement_bank_account_no": "payment.settlement_details.settlement_bank_account_no",
  //               "settlement_ifsc_code": "payment.settlement_details.settlement_ifsc_code",
  //               "bank_name": "payment.settlement_details.bank_name",
  //               "branch_name": "payment.settlement_details.branch_name"
  //           }
  //       ],
  //       "created_at":"payment.created_at",
  //       "updated_at":"payment.updated_at"
  //       },
  //       "quote": {
  //           "price": "quote.price",
  //           "breakup": [
  //               {
  //                   "@ondc/org/item_id": "quote.breakup.item_id",
  //                   "@ondc/org/item_quantity": "quote.breakup.item_quantity",
  //                   "title": "quote.breakup.title",
  //                   "@ondc/org/title_type": "quote.breakup.title_type",
  //                   "price": "quote.breakup.price",
  //                   "item": "quote.breakup.item"
  //               }
  //           ],
  //           "ttl": "quote.ttl"
  //       },
  //       "order_created_at": "created_at",
  //       "order_updated_at": "updated_at",
  //       "fulfillments": [
  //           {
  //               "id": "fulfillments.id",
  //               "@ondc/org/provider_name": "fulfillments.provider_name",
  //               "end":"fulfillments.end",
  //               "start": "fulfillments.start",
  //               "state": "fulfillments.state",
  //               "type": "fulfillments.type",
  //               "tracking": "fulfillments.tracking",
  //               "rateable": "fulfillments.rateable"
  //           }
  //       ]
  //   }

  //   ,
  //         async function(data,err){
  //           console.log(JSON.stringify(data),err)
  //         },
  //         )
  //       })

  // sdk.emitter.on("seller_status",function(data){
  //   sdk.order.Status(
  //     {
  //       "name": "search",
  //       "http_entity_endpoint": "http://localhost:8081/temp_data",
  //       "http_timeout": 8000,
  //       "http_retry_count": 0,
  //       "header_validity": 600000,
  //       "header_authentication": true,
  //       "set_authorization_header": true
  //     },
  //     {
  //       "id": "id",
  //       "state": "state",
  //       "provider_id": "provider.id",
  //       "locations": [
  //         {
  //           "id": "provider.locations.id"
  //         }
  //       ],
  //       "items": [
  //         {
  //           "id": "items.id",
  //           "fulfillment_id": "items.fulfillment_id",
  //           "quantity": "items.quantity.count",
  //           "tags": {
  //             "status": "items.tags.status"
  //           }
  //         }
  //       ],
  //       "billing": {
  //         "name": "billing.name",
  //         "locality": "billing.address.locality",
  //         "building": "billing.address.building",
  //         "city": "billing.address.city",
  //         "state": "billing.address.state",
  //         "country": "billing.address.country",
  //         "area_code": "billing.address.area_code",
  //         "phone": "billing.phone",
  //         "email": "billing.email",
  //         "created_at": "billing.created_at",
  //         "updated_at": "billing.updated_at"
  //       },
  //       "fulfillments": [
  //         {
  //           "id": "fulfillments.id",
  //           "@ondc/org/provider_name": "fulfillments.provider_name",
  //           "type": "fulfillments.type",
  //           "tracking": "fulfillments.tracking",
  //           "state": "fulfillments.state",
  //           "start": "fulfillments.start",
  //           "end": "fulfillments.end",
  //           "agent":{
  //             "name": "fulfillments.agent.name",
  //             "phone": "fulfillments.agent.phone"
  //           },
  //           "vehicle": "fulfillments.vehicle"
  //         }
  //       ],
  //       "quote": {
  //         "price": "quote.price",
  //         "breakup": [
  //           {
  //             "@ondc/org/item_id": "quote.breakup.item_id",
  //             "@ondc/org/item_quantity": "quote.breakup.item_quantity",
  //             "title": "quote.breakup.title",
  //             "@ondc/org/title_type": "quote.breakup.title_type",
  //             "price": "quote.breakup.price",
  //             "item": "quote.breakup.item"
  //           }
  //         ],
  //         "ttl": "quote.ttl"
  //       },
  //       "payment_uri": "payment.uri",
  //       "payment_tl_method": "payment.tl_method",
  //       "payment_amount": "payment.params.amount",
  //       "payment_currency": "payment.params.currency",
  //       "payment_transaction_id": "payment.params.transaction_id",
  //       "payment_status": "payment.status",
  //       "payment_type": "payment.type",
  //       "payment_collected_by": "payment.collected_by",
  //       "settlement_details": [
  //         {
  //           "upi_address": "payment.settlement_details.upi_address",
  //           "settlement_counterparty": "payment.settlement_details.settlement_counterparty",
  //           "settlement_phase": "payment.settlement_details.settlement_phase",
  //           "settlement_type": "payment.settlement_details.settlement_type",
  //           "beneficiary_name": "payment.settlement_details.beneficiary_name",
  //           "settlement_bank_account_no": "payment.settlement_details.settlement_bank_account_no",
  //           "settlement_ifsc_code": "payment.settlement_details.settlement_ifsc_code",
  //           "bank_name": "payment.settlement_details.bank_name",
  //           "branch_name": "payment.settlement_details.branch_name"
  //         }
  //       ],
  //       "buyer_app_finder_fee_amount": "payment.buyer_app_finder_fee_amount",
  //       "buyer_app_finder_fee_type": "payment.buyer_app_finder_fee_type",
  //       "documents": "documents",
  //       "created_at": "created_at",
  //       "updated_at": "updated_at",
  //       // "tags": "tags"
  //     },
  //     async function(data,err){
  //       console.log(JSON.stringify(data),err)
  //     },
  //     )
  //   })

  // sdk.emitter.on("seller_update",function(data){
  //     sdk.order.Update(
  //       {
  //         "name": "search",
  //         "http_entity_endpoint": "http://localhost:8081/temp_data",
  //         "http_timeout": 8000,
  //         "http_retry_count": 0,
  //         "header_validity": 600000,
  //         "header_authentication": true,
  //         "set_authorization_header": true
  //       },
  //       {
  //         "id": "id",
  //         "state": "state",
  //         "items": [
  //           {
  //             "id": "items.id",
  //             "fulfillment_id": "items.fulfillment_id",
  //             "quantity": "items.quantity.count",
  //             "tags": {
  //               "status": "items.tags.status"
  //             }
  //           }
  //         ],
  //         "quote": {
  //           "price": "quote.price",
  //           "breakup": [
  //             {
  //               "@ondc/org/item_id": "quote.breakup.item_id",
  //               "@ondc/org/item_quantity": "quote.breakup.item_quantity",
  //               "title": "quote.breakup.title",
  //               "@ondc/org/title_type": "quote.breakup.title_type",
  //               "price": "quote.breakup.price",
  //               "item": "quote.breakup.item"
  //             }
  //           ]
  //         },
  //         "fulfillments": [
  //           {
  //             "id": "fulfillments.id",
  //             "type": "fulfillments.type",
  //             "state": "fulfillments.state.descriptor.code",
  //             "start": "fulfillments.start",
  //             "end": "fulfillments.end",
  //           }
  //         ]
  //       }
  //       ,

  //       async function(data,err){
  //         console.log(JSON.stringify(data),err)
  //       },
  //       )
  //     })

  // sdk.emitter.on("seller_cancel",function(data){
  //   sdk.order.Cancel(
  //     {
  //       "name": "search",
  //       "http_entity_endpoint": "http://localhost:8081/temp_data",
  //       "http_timeout": 8000,
  //       "http_retry_count": 0,
  //       "header_validity": 600000,
  //       "header_authentication": true,
  //       "set_authorization_header": true
  //     },
  //     {
  //       "id": "id",
  //       "state": "state",
  //       "cancellation_reason_id": "tags.cancellation_reason_id"
  //   },
  //     async function(data,err){
  //       console.log(JSON.stringify(data),err)
  //     },
  //     )
  //   })

  // sdk.emitter.on("seller_support",function(data){
  //   sdk.order.Support(
  //     {
  //       "name": "search",
  //       "http_entity_endpoint": "http://localhost:8081/temp_data",
  //       "http_timeout": 8000,
  //       "http_retry_count": 0,
  //       "header_validity": 600000,
  //       "header_authentication": true,
  //       "set_authorization_header": true
  //     },
  //     {
  //       "phone":"phone",
  //       "email":"email",
  //       "uri":"uri"
  //     },
  //     async function(data,err){
  //       console.log(JSON.stringify(data),err)
  //     },
  //     )
  //   })
  // sdk.emitter.on("seller_track",function(data){
  //   sdk.order.Track(
  //     {
  //       "name": "search",
  //       "http_entity_endpoint": "http://localhost:8081/temp_data",
  //       "http_timeout": 8000,
  //       "http_retry_count": 0,
  //       "header_validity": 600000,
  //       "header_authentication": true,
  //       "set_authorization_header": true
  //     },
  //     {
  //       "tracking":{
  //           "status": "tracking.status",
  //           "uri": "tracking.uri"
  //       }
  //   },

  //     async function(data,err){
  //       console.log(JSON.stringify(data),err)
  //     },
  //     )
  //   })
}
test()






// sdk.emitter.on("seller_status",function(data){
// sdk.search({context_keys},
//   {
//     "http_entity_endpoint": "API_ENDPOINT/search",
//     "http_timeout": 8000,
//     "http_retry_count": 0,
//     "header_validity": 600000,
//     "header_authentication": true,
//     "set_authorization_header": true
//   },
//   {
//     "search_api_key": "search_key",
//     "search_api_prop":"search_api_prop_key",
//     "end_api_lat_lng":"lop",
//     "data": data,
//   },
//   {
//     "bpp_descriptor": {
//       "name": "name",
//       "symbol": "symbol",
//       "short_desc": "short_desc",
//       "long_desc": "long_desc",
//       "images": "images"
//     },
//     "bpp_providers": [
//       {
//         "id": "id",
//         "time": {
//           "label": "label",
//           "timestamp": "timestamp"
//         },
//         "descriptor": {
//           "name": "name",
//           "symbol": "symbol",
//           "short_desc": "short_desc",
//           "long_desc": "long_desc",
//           "images": "images"
//         },
//         "@ondc/org/fssai_license_no": "fssai_license_no",
//         "ttl": "ttl",
//         "locations": [
//           {
//             "id": "id",
//             "gps": "gps",
//             "address": {
//               "locality": "locality",
//               "street": "street",
//               "city": "city",
//               "area_code": "area_code",
//               "state": "state"
//             },
//             "circle": {
//               "gps": "gps",
//               "radius": {
//                 "unit": "unit",
//                 "value": "value"
//               }
//             },
//             "time": {
//               "days": "days",
//               "schedule": {
//                 "holidays": "holidays",
//                 "frequency": "frequency",
//                 "times": "times"
//               },
//               "range": {
//                 "start": "start",
//                 "end": "end"
//               }
//             }
//           }
//         ],
//         "items": [
//           {
//             "id": "id",
//             "descriptor": {
//               "name": "name",
//               "code": "code",
//               "symbol": "symbol",
//               "short_desc": "short_desc",
//               "long_desc": "long_desc",
//               "images": "images"
//             },
//             "quantity_available": "qty_available",
//             "quantity_maximum": "qty_maximum",
//             "price": {
//               "currency": "currency",
//               "value": "value",
//               "maximum_value": "maximum_value"
//             },
//             "category_id": "category_id",
//             "fulfillment_id": "fulfillment_id",
//             "location_id": "location_id",
//             "recommended": "recommended",
//             "@ondc/org/returnable": "returnable",
//             "@ondc/org/cancellable": "cancellable",
//             "@ondc/org/return_window": "return_window",
//             "@ondc/org/seller_pickup_return": "seller_pickup_return",
//             "@ondc/org/time_to_ship": "time_to_ship",
//             "@ondc/org/available_on_cod": "cod",
//             "@ondc/org/contact_details_consumer_care": "contact_details_consumer_care",
            // "@ondc/org/statutory_reqs_packaged_commodities": {
            //   "manufacturer_or_packer_name": "manufacturer_name",
            //   "manufacturer_or_packer_address": "manufacturer_address",
            //   "common_or_generic_name_of_commodity": "commodity_name",
            //   "net_quantity_or_measure_of_commodity_in_pkg": "qty_commodity",
            //   "month_year_of_manufacture_packing_import": "month_year_package",
            //   "imported_product_country_of_origin": "country"
            // },
            // "@ondc/org/statutory_reqs_prepackaged_food": {
            //   "nutritional_info": "nutritional_info",
            //   "additives_info": "additives_info",
            //   "brand_owner_FSSAI_license_no": "brand_owner_FSSAI_license_no",
            //   "other_FSSAI_license_no": "other_FSSAI_license_no",
            //   "importer_FSSAI_license_no": "importer_FSSAI_license_no",
            //   "imported_product_country_of_origin": "country"
            // },
            // "@ondc/org/mandatory_reqs_veggies_fruits": {
            //   "net_quantity": "net_quantity"
            // },
//             "tags": {
//               "veg": "veg",
//               "non_veg": "non_veg"
//             }
//           }
//         ],
//         "fulfillments": [
//           {
//             "contact": {
//               "phone": "phone",
//               "email": "email"
//             }
//           }
//         ],
//         "tags": "tags"
//       }
//     ]
//   }, async function(data,err) {
//        return data;
//     })