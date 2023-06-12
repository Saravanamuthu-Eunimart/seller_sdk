var groceryKeys = [
    "Fruits and Vegetables",
    "Masala & Seasoning",
    "Oil & Ghee",
    "Gourmet & World Foods",
    "Foodgrains",
    "Eggs, Meat & Fish",
    "Cleaning & Household",
    "Beverages",
    "Beauty & Hygiene",
    "Bakery, Cakes & Dairy",
    "Kitchen Accessories",
    "Baby Care",
    "Snacks & Branded Foods",
    "Pet Care",
    "Stationery",
    "Home Improvement"


]

var foodAndBeverageKeys = [
    "Continental",
    "Middle Eastern",
    "North Indian",
    "Pan-Asian",
    "Regional Indian",
    "South Indian",
    "Tex-Mexican",
    "World Cuisines",
    "Healthy Food",
    "Fast Food",
    "Desserts",
    "Bakes & Cakes",
    "Beverages",
    "F&B",


]

const fashionKeys = [
    "Men's Fashion Accessories",
    "Men's Footwear Accessories",
    "Men's Topwear",
    "Men's Bottomwear",
    "Men's Innerwear & Sleepwear",
    "Men's Bags & Luggage",
    "Men's Eyewear",
    "Men's Footwear",
    "Men's Jewellery",
    "Women's Fashion Accessories",
    "Women's Footwear Accessories",
    "Women's Indian & Fusion Wear",
    "Women's Western Wear",
    "Women's Lingerie & Sleepwear",
    "Women's Bags & Luggage",
    "Women's Eyewear",
    "Women's Footwear",
    "Women's Jewellery",
    "Boy's Clothing",
    "Boy's Footwear",
    "Girl's Clothing",
    "Girl's Footwear",
    "Infant's Wear",
    "Infant Care & Accessories",
    "Infant Feeding & Nursing Essentials",
    "Infant Bath Accessories",
    "Infant Health & Safety",
    "Infant Diapers & Toilet Training",
    "Kid's Towels & Wrappers",
    "Kid's Fashion Accessories",
    "Kid's Jewellery",
    "Kid's Eyewear",
    "Kid's Bags & Luggage"
];

const electronicKeys = [
    "Audio",
    "Camera and Camcorder",
    "Computer Peripheral",
    "Desktop and Laptop",
    "Earphone",
    "Gaming",
    "Headphone",
    "Mobile Phone",
    "Mobile Accessories",
    "Safety Security",
    "Smart Watches",
    "Speaker",
    "Television",
    "Video",
    "Air Conditioning and Air Cleaners",
    "Health, Home and Personal Care",
    "Heaters",
    "Kitchen Appliances",
    "Lighting & Electric Fans",
    "Refrigerators and Freezers",
    "Vacuum Cleaners",
    "Washing Machines and Accessories",
    "Water Purifiers and Coolers",
    "Inverter & Stabilizer"
  ];

var mandatoryCommonKeys = [
    "id",
    "@ondc/org/available_on_cod",
    "@ondc/org/cancellable",
    "@ondc/org/contact_details_consumer_care",
    "@ondc/org/return_window",
    "@ondc/org/returnable",
    "@ondc/org/seller_pickup_return",
    "@ondc/org/time_to_ship",
    "category_id",
    "descriptor",
    "fulfillment_id",
    "location_id",
    "price",
    "quantity"]



class CatalogMapper {
    async grocery(item) {
        // for (let i = 0; i < mandatoryCommonKeys.length; i++) {
        //     const manKeys = mandatoryCommonKeys[i];
        //     if (!item.hasOwnProperty(manKeys)) {
        //         return undefined
        //     }
        // }
        var result={}
        var mandatoryFields=["@ondc/org/statutory_reqs_packaged_commodities","@ondc/org/statutory_reqs_prepackaged_food","@ondc/org/mandatory_reqs_veggies_fruits","tags"]
        var mandatoryKeys=[...mandatoryCommonKeys,...mandatoryFields]
        for(const item_key in mandatoryKeys){
            if(!(mandatoryKeys[item_key] in item)){
                return undefined
            }else{
                if(item[mandatoryKeys[item_key]] != undefined){
                    result[mandatoryKeys[item_key]]=item[mandatoryKeys[item_key]]
                }
                else{
                    return undefined
                }
            }
        }
        return result
        // for (const key in item) {
        //     if (mandatoryCommonKeys.includes(key)) {
        //         continue
        //     }
        //     else if (key == "@ondc/org/statutory_reqs_packaged_commodities" || key == "@ondc/org/statutory_reqs_prepackaged_food" || key == "@ondc/org/mandatory_reqs_veggies_fruits" || key == "tags") {
        //         flag = 1
        //         continue
        //     }
        //     else if (flag == 0) {
        //         delete item[key]
        //     }
        // }
        // console.log("----flag",flag,item)
        // if (flag) {
        //     return item
        // }
        // else {
        //     return undefined
        // }
    }

    async foodAndBeverage(item) {
        var result={}
        var mandatoryKeys=[...mandatoryCommonKeys,["tags"]]
        for(const item_key in mandatoryKeys){
            if(!(mandatoryKeys[item_key] in item)){
                return undefined
            }else{
                if(item[mandatoryKeys[item_key]] != undefined){
                    result[mandatoryKeys[item_key]]=item[mandatoryKeys[item_key]]
                }
                else{
                    // console.log("else----------",item[mandatoryKeys[item_key]],mandatoryKeys[item_key]);
                    return undefined
                }
            }
        }
        return result
        // for (let i = 0; i < mandatoryCommonKeys.length; i++) {
        //     const manKeys = mandatoryCommonKeys[i];
        //     if (!item.hasOwnProperty(manKeys)) {
        //         return undefined
        //     }
        // }
        // var flag = 0
        // for (const key in item) {
        //     if (mandatoryCommonKeys.includes(key)) {
        //         continue
        //     }
        //     else if (key == "tags") {
        //         flag == 1
        //         continue
        //     }
        //     else if (flag == 0) {
        //         delete item[key]
        //     }
        // }
        // if (flag) {
        //     return item
        // }
        // else {
        //     return undefined
        // }
    }

    async fashion(item) {

        var result={}
        var mandatoryKeys=[...mandatoryCommonKeys]
        for(const item_key in mandatoryKeys){
            if(!(mandatoryKeys[item_key] in item)){
                return undefined
            }else{
                if(item[mandatoryKeys[item_key]] != undefined){
                    result[mandatoryKeys[item_key]]=item[mandatoryKeys[item_key]]
                }
                else{
                    return undefined
                }
            }
        }
        return result
        // for (let i = 0; i < mandatoryCommonKeys.length; i++) {
        //     const manKeys = mandatoryCommonKeys[i];
        //     if (!item.hasOwnProperty(manKeys)) {
        //         return undefined
        //     }
        // }
        // for (const key in item) {
        //     if (mandatoryCommonKeys.includes(key)) {
        //         continue
        //     }
        //     else {
        //         delete item[key]
        //     }
        // }
        // return item

    }

    async electronics(item) {

        var result={}
        var mandatoryKeys=[...mandatoryCommonKeys]
        for(const item_key in mandatoryKeys){
            if(!(mandatoryKeys[item_key] in item)){
                return undefined
            }else{
                if(item[mandatoryKeys[item_key]] != undefined){
                    result[mandatoryKeys[item_key]]=item[mandatoryKeys[item_key]]
                }
                else{
                    return undefined
                }
            }
        }
        return result
    }
}
export { CatalogMapper, groceryKeys, foodAndBeverageKeys, fashionKeys, electronicKeys }