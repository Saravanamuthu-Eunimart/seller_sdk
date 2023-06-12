var temp={
    "id": "4a5e0742-21b8-41c3-a75b-2334bec2d2d7",
    "state": "Cancelled",
    "items": [
        {
            "fulfillment_id": "PROVIDER-FULFILLMENT-1",
          "id": "Musk123",
            "quantity": {
                "count": 1
            },
            "tags": {
                "status": "Cancelled"
            }
        }
    ],
    "quote": {
        "price": {
            "currency": "INR",
            "value": "0"
        },
        "breakup": [
            {
                "item_id": "I1",
                "title_type": "item",
                "item_quantity": {
                    "count": 1
                },
                "price": {
                    "currency": "INR",
                    "value": "0"
                },
                "item": {
                    "price": {
                        "currency": "INR",
                        "value": "5.0"
                    }
                }
            }
        ]
    },
    "fulfillments": [
        {
            "id": "PROVIDER-FULFILLMENT-1",
            "type": "Prepaid",
            "state": {
                "descriptor": {
                    "code": "Cancelled"
                }
            },
            "start": {
                "time": {
                    "range": {
                        "start": "2022-02-03T10:00:00.000Z",
                        "end": "2022-02-03T10:30:00.000Z"
                    },
                    "timestamp": "2022-02-03T10:00:00.000Z"
                }
            },
            "end": {
                "time": {
                    "range": {
                        "start": "2022-02-03T11:00:00.000Z",
                        "end": "2022-02-03T11:30:00.000Z"
                    },
                    "timestamp": "2022-02-03T11:00:00.000Z"
                }
            }
        }
    ]
}

module.exports=temp
// export default temp