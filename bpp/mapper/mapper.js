import { bppProtocolOnCancel, bppProtocolOnConfirm, bppProtocolOnInit, bppProtocolOnSearch, bppProtocolOnSelect, bppProtocolOnStatus, bppProtocolOnUpdate, bppProtocolOnSupport, bppProtocolOnTrack } from "../shared/on_action_call/on_action.js";
// import { bppProtocolOnSupport } from "../../shared/utils/protocolApis/index.js";
// import { bppProtocolOnUpdate } from "../../shared/utils/protocolApis/index.js";
// import { bppProtocolOnStatus } from "../../shared/utils/protocolApis/index.js";
import { setContext, getContext } from "../config/global_context.js";
import { Category } from "../config/config.js";
import { CatalogMapper, groceryKeys, foodAndBeverageKeys, fashionKeys, electronicKeys } from "./catalog_mapper.js";
// import temp_payload from "./on_search_payload.js"
// import { searchInput, selectInput, initInput, confirmInput } from "./input.js";


// var searchData = searchInput
// var selectData = selectInput
// var initData = initInput
// var confirmData = confirmInput

const catlogInstance = new CatalogMapper()
class PayloadConstructor {
    async searchMapper(data) {
        setContext({
            "timestamp": new Date(),
            "action": "on_search"
        })
        var newProvider = data?.bpp_providers
        if (newProvider != undefined) {
            for (let j = 0; j < newProvider.length; j++) {
                // const t=newProvider[j]?.tags
                const element = newProvider[j];
                var newItem = element?.items
                var items_array=[]
                if (newItem != undefined) {
                    for (let i = 0; i < newItem.length; i++) {
                        const element2 = newItem[i];
                        var newQuantity = {
                            "available": {
                                "count": element2?.quantity_available
                            },
                            "maximum": {
                                "count": element2?.quantity_maximum
                            }
                        }
                        element2.quantity = newQuantity
                        if (element2?.category_id) {
                            for (const key in Category) {
                                if (element2?.category_id == Category[key]) {
                                    element2.category_id = key
                                    break
                                }
                            }
                            if (groceryKeys.includes(element2.category_id)) {
                                var retData = await catlogInstance.grocery(element2)
                                if (retData) {
                                    // element2 = retData
                                    items_array.push(retData)
                                }
                            }
                            else if (foodAndBeverageKeys.includes(element2.category_id)) {
                                var retData = await catlogInstance.foodAndBeverage(element2)
                                if (retData) {
                                    items_array.push(retData)

                                }
                            }
                            else if (fashionKeys.includes(element2.category_id)){
                                var retData = await catlogInstance.fashion(element2)
                                if (retData) {
                                    items_array.push(retData)

                                }
                            }
                            else if (electronicKeys.includes(element2.category_id)){
                                var retData = await catlogInstance.electronics(element2)
                                if (retData) {
                                    items_array.push(retData)
                                }
                            }
                        }
                        // items_array.push(element2)
                    }
                    // element.items = items_array
                }
                newProvider[j].items=items_array
                // console.log("------ items_array------", newProvider[j])
            }
        }
        var searchRequest = {
            context: getContext(),
            message: {
                catalog: {
                    "bpp/fulfillments": data.bpp_fulfillments,
                    "bpp/descriptor": data.bpp_descriptor,
                    "bpp/providers": newProvider
                }
            }
        }
        // console.log("------- ",JSON.stringify(searchRequest))
        // return searchRequest
        return await bppProtocolOnSearch(searchRequest.context?.bap_uri, searchRequest);
    }

    async selectMapper(data) {
        setContext({
            "timestamp": new Date(),
            "action": "on_select"
        })
        var newFulfilments = data?.fulfillments
        for (let i = 0; i < newFulfilments.length; i++) {
            const element = newFulfilments[i];
            var newstate = {
                descriptor: {
                    code: element?.state
                }
            }
            element.state = newstate
        }

        var newBreakup = data?.quote?.breakup
        for (let i = 0; i < newBreakup.length; i++) {
            const element = newBreakup[i];
            if (element?.item) {
                var newQuantity = {
                    "available": {
                        "count": element?.item?.quantity_available
                    },
                    "maximum": {
                        "count": element?.item?.quantity_maximum
                    }
                }
                delete element.item.quantity_available
                delete element.item.quantity_maximum
                element.item.quantity = newQuantity
            }
        }


        var selectRequest = {
            context: getContext(),
            message: {
                order: {
                    provider: {
                        id: data.provider
                    },
                    items: data.items,
                    fulfillments: newFulfilments,
                    quote: {
                        price: data.quote.price,
                        breakup: newBreakup
                    }
                }
            }
        }
        return await bppProtocolOnSelect(selectRequest.context?.bap_uri, selectRequest);
        return selectRequest
    }

    async initMapper(data) {
        setContext({
            "timestamp": new Date(),
            "action": "on_init"
        })
        var newItems = data?.items
        for (let i = 0; i < newItems.length; i++) {
            const element = newItems[i];
            var quan = {
                count: element?.quantity
            }
            element.quantity = quan
        }
        var newFulfilments = data?.fulfillments
        for (let i = 0; i < newFulfilments.length; i++) {
            const element = newFulfilments[i];
            var newend = {
                location: {
                    gps: element?.end?.gps,
                    address: element?.end?.address
                },
                contact: {
                    phone: element?.end?.contact
                }
            }
            element.end = newend
        }
        var initRequest = {
            context: getContext(),
            message: {
                order: {
                    provider: {
                        id: data.provider
                    },
                    provider_location: {
                        id: data.provider_location
                    },
                    items: newItems,
                    billing: {
                        name: data.billing?.name,
                        address: {
                            name: data.billing?.name,
                            building: data.billing?.building,
                            door: data.billing?.door,
                            locality: data.billing?.locality,
                            city: data.billing?.city,
                            state: data.billing?.state,
                            country: data.billing?.country,
                            area_code: data.billing?.area_code,
                        },
                        email: data.billing?.email,
                        phone: data.billing?.phone,
                        created_at: data.billing?.created_at,
                        updated_at: data.billing?.updated_at
                    },
                    fulfillments: newFulfilments,
                    quote: data.quote,
                    payment: {
                        "@ondc/org/buyer_app_finder_fee_type": data.buyer_app_finder_fee_type,
                        "@ondc/org/buyer_app_finder_fee_amount": data.buyer_app_finder_fee_amount,
                        "@ondc/org/settlement_details": data.settlement_details
                    }
                }
            }
        }
        return await bppProtocolOnInit(initRequest.context?.bap_uri, initRequest);
    }

    async confirmMapper(data) {
        setContext({
            "timestamp": new Date(),
            "action": "on_confirm"
        })
        var ConfirmRequest = {
            context: getContext(),
            message: {
                order: {
                    id: data.order_id,
                    state: data.state,
                    provider: {
                        id: data?.provider_id,
                        locations: data?.locations,
                    },
                    items: data.items,
                    billing: {
                        name: data.billing?.name,
                        address: {
                            name: data.billing?.address_name,
                            building: data.billing?.address_name,
                            door: data.billing?.door,
                            locality: data.billing?.locality,
                            city: data.billing?.city,
                            state: data.billing?.state,
                            country: data.billing?.country,
                            area_code: data.billing?.area_code,
                        },
                        email: data.billing?.email,
                        phone: data.billing?.phone,
                        created_at: data.billing?.created_at,
                        updated_at: data.billing?.updated_at
                    },
                    quote: data?.quote,
                    payment: data?.payment,
                    fulfillments: data?.fulfillments,
                    payment:
                    {
                        uri: data?.payment?.uri,
                        tl_method: data?.payment?.tl_method,
                        params:
                        {
                            currency: data?.payment?.currency,
                            transaction_id: data?.payment?.transaction_id,
                            amount: data?.payment?.amount
                        },
                        status: data?.payment?.status,
                        type: data?.payment?.type,
                        collected_by: data?.payment?.collected_by,
                        "@ondc/org/buyer_app_finder_fee_type": data?.payment?.buyer_app_finder_fee_type,
                        "@ondc/org/buyer_app_finder_fee_amount": data?.payment?.buyer_app_finder_fee_amount,
                        "@ondc/org/settlement_details": data?.payment?.settlement_details
                    }

                }
            }
        }

        return await bppProtocolOnConfirm(ConfirmRequest.context?.bap_uri, ConfirmRequest);
    }

    async statusMapper(data) {
        setContext({
            "timestamp": new Date(),
            "action": "on_status"
        })
        var newItems = data?.items
        for (let i = 0; i < newItems.length; i++) {
            const element = newItems[i];
            element.quantity = {
                count: element?.quantity
            }
        }

        var StatusRequest = {
            context: getContext(),
            message: {
                order: {
                    id: data.id,
                    state: data.state,
                    provider: {
                        id: data.provider_id,
                        locations: data.locations,
                    },
                    items: newItems,
                    billing: {
                        name: data.billing?.name,
                        address: {
                            name: data.billing?.name,
                            building: data.billing?.building,
                            door: data.billing?.door,
                            locality: data.billing?.locality,
                            city: data.billing?.city,
                            state: data.billing?.state,
                            country: data.billing?.country,
                            area_code: data.billing?.area_code,
                        },
                        email: data.billing?.email,
                        phone: data.billing?.phone,
                        created_at: data.billing?.created_at,
                        updated_at: data.billing?.updated_at
                    },
                    fulfillments: data?.fulfillments,
                    quote: data.quote,
                    payment: {
                        uri: data.payment_uri,
                        tl_method: data.payment_tl_method,
                        params: {
                            currency: data.payment_currency,
                            transaction_id: data.payment_transaction_id,
                            amount: data.payment_amount
                        },
                        status: data.payment_status,
                        type: data.payment_type,
                        collected_by: data.payment_collected_by,
                        "@ondc/org/buyer_app_finder_fee_type": data.buyer_app_finder_fee_type,
                        "@ondc/org/buyer_app_finder_fee_amount": data.buyer_app_finder_fee_amount,
                        "@ondc/org/settlement_details": data.settlement_details
                    },
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    documents: data.documents,
                    tags: data.tags
                }
            }
        }
        return await bppProtocolOnStatus(StatusRequest.context?.bap_uri, StatusRequest);
        // return StatusRequest
    }
    async updateMapper(data) {
        setContext({
            "timestamp": new Date(),
            "action": "on_update"
        })
        var newItems = data?.items
        for (let i = 0; i < newItems.length; i++) {
            const element = newItems[i];
            element.quantity = {
                count: element?.quantity
            }
        }
        var newFulfilments = data?.fulfillments
        for (let i = 0; i < newFulfilments.length; i++) {
            const element = newFulfilments[i];
            element.state = {
                descriptor: {
                    code: element?.state
                }
            }
        }
        var UpdateRequest = {
            context: getContext(),
            message: {
                order: {
                    id: data.id,
                    state: data.state,
                    items: newItems,
                    fulfillments: newFulfilments,
                    quote: data.quote,
                }
            }
        }
        return await bppProtocolOnUpdate(UpdateRequest.context?.bap_uri, UpdateRequest);
    }

    async cancelMapper(data) {
        setContext({
            "timestamp": new Date(),
            "action": "on_update"
        })
        var CancelMapper = {
            context: getContext(),
            message: {
                order: {
                    id: data.id,
                    state: data.state,
                    tags: {
                        cancellation_reason_id: data.cancellation_reason_id
                    }
                }
            }
        }
        return await bppProtocolOnCancel(CancelMapper.context?.bap_uri, CancelMapper);

        // return payload
    }

    async supportMapper(data) {
        setContext({
            "timestamp": new Date(),
            "action": "on_support"
        })
        var SupportRequest = {
            context: getContext(),
            message: {
                phone: data.phone,
                email: data.email,
                uri: data.uri
            }
        }
        return await bppProtocolOnSupport(SupportRequest.context?.bap_uri, SupportRequest);
    }


    async trackMapper(data) {
        setContext({
            "timestamp": new Date(),
            "action": "on_track"
        })
        var TrackRequest = {
            context: getContext(),
            message: {
                tracking: data.tracking
            }
        }
        return await bppProtocolOnTrack(TrackRequest.context?.bap_uri, TrackRequest);
    }

}

class PayloadConstructorVersion2{
    async searchMapper(data){
        
        return data
    }
}

export {PayloadConstructor, PayloadConstructorVersion2}