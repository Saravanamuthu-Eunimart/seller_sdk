var temp= {
      "provider": {
        "id": "SIVA-ONDC-STORE-865"
      },
      "items": [
        {
          "fulfillment_id": "PROVIDER-FULFILLMENT-1",
          "id": "Musk123"
        }
      ],
      "fulfillments": [
        {
          "id": "PROVIDER-FULFILLMENT-1",
          "@ondc/org/provider_name": "amit arore",
          "tracking": false,
          "@ondc/org/category": "Delivery",
          "@ondc/org/TAT": "P7D",
          "state": {
            "descriptor": {
              "code": "Serviceable"
            }
          }
        }
      ],
      "quote": {
        "price": {
          "currency": "INR",
          "value": "89.00"
        },
        "breakup": [
          {
            "@ondc/org/item_id": "Musk123",
            "@ondc/org/item_quantity": {
              "count": 1
            },
            "title": "Muskmelon",
            "@ondc/org/title_type": "item",
            "price": {
              "currency": "INR",
              "value": "80.00"
            },
            "item": {
              "qty_available":"100",
                "qty_maximum":"100",
              "price": {
                "currency": "INR",
                "value": "80.00"
              }
            }
          },
          {
            "@ondc/org/item_id": "Musk123",
            "title": "Tax",
            "@ondc/org/title_type": "tax",
            "price": {
              "currency": "INR",
              "value": "4.00"
            }
          },
          {
            "@ondc/org/item_id": "PROVIDER-FULFILLMENT-1",
            "title": "Packing charges",
            "@ondc/org/title_type": "packing",
            "price": {
              "currency": "INR",
              "value": "5.00"
            }
          },
          {
            "@ondc/org/item_id": "PROVIDER-FULFILLMENT-1",
            "title": "Delivery charges",
            "@ondc/org/title_type": "delivery",
            "price": {
              "currency": "INR",
              "value": "0.00"
            }
          }
        ],
        "ttl": "P1D"
      }
    }
export default temp