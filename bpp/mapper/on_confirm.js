var temp={
    "id": "4a5e0742-21b8-41c3-a75b-2334bec2d2d7",
    "state": "Accepted",
    "provider": {
        "id": "SIVA-ONDC-STORE-865",
        "locations": [
            {
                "id": "SIVA-ONDC-STORE-865-LOC-1"
            }
        ],
        "rateable": true
    },
    "items": [
        {
            "fulfillment_id": "PROVIDER-FULFILLMENT-1",
          "id": "Musk123",
            "quantity": {
                "count": 1
            }
        }
    ],
    "billing": {
        "name": "ONDC buyer",
        "address": {
            "name": "My house #",
            "building": "My building name",
            "door": "B005 aaspire heights",
            "locality": "My street name",
            "city": "Bengaluru",
            "state": "Karnataka",
            "country": "IND",
            "area_code": "560037"
        },
        "email": "nobody@nomail.com",
        "phone": "9886098860",
        "created_at": "2023-02-03T09:00:00.000Z",
        "updated_at": "2023-02-03T09:00:00.000Z"
    },
    "fulfillments": [
        {
            "id": "PROVIDER-FULFILLMENT-1",
            "provider_name": "Loadshare",
            "state": {
                "descriptor": {
                    "code": "nPending"
                }
            },
            "type": "Delivery",
            "tracking": false,
            "start": {
                "location": {
                    "id": "L1",
                    "descriptor": {
                        "name": "ABC Store"
                    },
                    "gps": "12.956399,77.636803"
                },
                "time": {
                    "range": {
                        "start": "2023-02-03T10:00:00.000Z",
                        "end": "2023-02-03T10:30:00.000Z"
                    }
                },
                "instructions": {
                    "name": "Status for pickup",
                    "short_desc": "Pickup Confirmation Code"
                },
                "contact": {
                    "phone": "9886098860",
                    "email": "nobody@nomail.com"
                }
            },
            "end": {
                "location": {
                    "gps": "12.9492953,77.7019878",
                    "address": {
                        "name": "My house #",
                        "building": "My building name",
                        "door": "B005 aaspire heights",
                        "locality": "My street name",
                        "city": "Bengaluru",
                        "state": "Karnataka",
                        "country": "IND",
                        "area_code": "560037"
                    }
                },
                "time": {
                    "range": {
                        "start": "2023-02-03T11:00:00.000Z",
                        "end": "2023-02-03T11:30:00.000Z"
                    }
                },
                "instructions": {
                    "name": "Status for drop",
                    "short_desc": "Delivery Confirmation Code"
                },
                "contact": {
                    "phone": "9886098860"
                }
            },
            "rateable": true
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
      },
    "payment": {
        "uri": "https://ondc.transaction.com/payment",
        "tl_method": "http/get",
        "params": {
            "currency": "INR",
            "transaction_id": "3937",
            "amount": "245"
        },
        "status": "PAID",
        "type": "ON-ORDER",
        "collected_by": "BAP",
        "buyer_app_finder_fee_type": "percent",
        "buyer_app_finder_fee_amount": "3",
        "settlement_details": [
            {
                "settlement_counterparty": "seller-app",
                "settlement_phase": "sale-amount",
                "beneficiary_name": "xxxxx",
                "settlement_type": "upi",
                "upi_address": "gft@oksbi",
                "settlement_bank_account_no": "XXXXXXXXXX",
                "settlement_ifsc_code": "XXXXXXXXX",
                "bank_name": "xxxx",
                "branch_name": "xxxx"
            }
        ]
    },
    "created_at": "2023-02-03T09:30:00.000Z",
    "updated_at": "2023-02-03T09:31:30.000Z"
}

export default temp