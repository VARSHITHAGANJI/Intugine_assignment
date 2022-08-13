# Project: Intugine
We create many API's in this collection to add and get the details of customers, add purchases and shipping details to customers.

## End-point: Add new customers
API to add new customer to customers collection in shopDB database, we need to give the details of customers as the values of fields specified in the body below.
### Method: POST
>```
>http://localhost:3000/newcustomer
>```
### Response: 200
```json
Success
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add purchase to customer
API to add purchase details to purchases collection in shopDB database, given customer id which is passed as parameter of route. Also the details should be specified as values to body parameters.
### Method: POST
>```
>http://localhost:3000/:customerId/newpurchase
>```
### Response: 200
```json
Success
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add shipping details
API to add shipment details to shippings collection in shopDB database. Give the customer ID and purchase ID as route parameters and values to the body parameters.
### Method: POST
>```
>http://localhost:3000/:customerId/:purchaseId/shipment
>```
### Response: 200
```json
Success
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get shipment details with city filter
Request url is in the form [http://localhost:3000/customers?city=](http://localhost:3000/customers?city='') .

City name is passed as query parameter.

Gets all the shipment details of the customers which have to shipped to the specified city.
### Method: GET
>```
>http://localhost:3000/customers?city=
>```
### Query Params

|Param|value|
|---|---|
|city||


### Response: 200
```json
[
    {
        "_id": "62f716599c287958af28b11e",
        "customerName": "Varsh_1",
        "email": "varsh1@gmail.com",
        "mobileNumber": 9912010050,
        "city": "Hyderabad",
        "shippingdetails": [
            {
                "_id": "62f71fbaf3c1beedd5db1926",
                "address": "chandrapuri cly L B nagar",
                "pincode": 500074,
                "purchase_id": "62f71eb3b68c9f99efaefe91"
            }
        ]
    },
    {
        "_id": "62f781ba65eb3c23605bee80",
        "customerName": "Username",
        "email": "username@gmail.com",
        "mobileNumber": 9933958050,
        "city": "Hyderabad",
        "shippingdetails": [
            {
                "_id": "62f7826365eb3c23605bee84",
                "address": "Vanasthalipuram",
                "pincode": 500074,
                "purchase_id": "62f71eb3b68c9f99efaefe91"
            }
        ]
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get customers with purchases
API to get all the customers and their respective purchase details.
### Method: GET
>```
>http://localhost:3000/customers/purchases/
>```
### Response: 200
```json
[
    {
        "_id": "62f716599c287958af28b11e",
        "customerName": "Varsh_1",
        "email": "varsh1@gmail.com",
        "mobileNumber": 9912010050,
        "city": "Hyderabad",
        "PurchaseOrder": [
            {
                "_id": "62f71eb3b68c9f99efaefe91",
                "productName": "brush",
                "quantity": 1,
                "mrp": 22,
                "pricing": 20
            },
            {
                "_id": "62f781f065eb3c23605bee82",
                "productName": "brush",
                "quantity": 1,
                "mrp": 22,
                "pricing": 20
            }
        ]
    },
    {
        "_id": "62f781ba65eb3c23605bee80",
        "customerName": "Username",
        "email": "username@gmail.com",
        "mobileNumber": 9933958050,
        "city": "Hyderabad",
        "PurchaseOrder": []
    }
]
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get customers with purchases and shipping
API to get customers with purchase details and shipping details for each purchase.

Empty purchase orders and shipment details implies that there are no purchases for that customer and no shipping details for that purchase respectively.
### Method: GET
>```
>http://localhost:3000/customers/purchases/shipping
>```
### Response: 200
```json
[
    {
        "_id": "62f716599c287958af28b11e",
        "customerName": "Varsh_1",
        "email": "varsh1@gmail.com",
        "mobileNumber": 9912010050,
        "city": "Hyderabad",
        "PurchaseOrders": [
            {
                "_id": "62f71eb3b68c9f99efaefe91",
                "productName": "brush",
                "quantity": 1,
                "mrp": 22,
                "pricing": 20,
                "Shippingdetails": [
                    {
                        "_id": "62f71fbaf3c1beedd5db1926",
                        "address": "chandrapuri cly L B nagar",
                        "city": "Hyderabad",
                        "pincode": 500074
                    },
                    {
                        "_id": "62f7826365eb3c23605bee84",
                        "address": "Vanasthalipuram",
                        "city": "Hyderabad",
                        "pincode": 500074
                    }
                ]
            },
            {
                "_id": "62f781f065eb3c23605bee82",
                "productName": "brush",
                "quantity": 1,
                "mrp": 22,
                "pricing": 20,
                "Shippingdetails": []
            }
        ]
    },
    {
        "_id": "62f781ba65eb3c23605bee80",
        "customerName": "Username",
        "email": "username@gmail.com",
        "mobileNumber": 9933958050,
        "city": "Hyderabad",
        "PurchaseOrders": []
    }
]
```

