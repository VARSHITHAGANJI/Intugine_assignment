//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require('mongoose-type-email');
const app = express();


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//Connecting to shopDB mongodb database
mongoose.connect("mongodb://localhost:27017/shopDB",{useNewUrlParser: true});

//Creating customers schema
const customerSchema = new mongoose.Schema(
{//Using validators for various fields
  customerName : { type: String , required: [true, 'Please enter your name']  },
  email : {type: mongoose.SchemaTypes.Email, required: [true, 'Please enter valid email']},
  mobileNumber: {type: Number, required: [true, 'Please enter valid number'] },
  city : {type: String, required: [true, 'Please enter valid city']}


});

const Customer = mongoose.model("Customer",customerSchema);

//creating purchase schema
const purchaseSchema = new mongoose.Schema({
productName : {type: String, required: [true, 'Please enter product name'] },
quantity : {type: Number, default: 0},
mrp : {type: Number , required:[true,'Please enter MRP']},
pricing: {type: Number, max: [this.mrp, 'Must be less than {this.mrp}, got {VALUE}']},
customerId : {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}

});

const Purchase = mongoose.model("Purchase",purchaseSchema);
//Creating shipping schema
const shipSchema = new mongoose.Schema({
address : {type: String, required: [true,'Please enter valid address']},
city : {type: String, required: [true, 'Please enter valid city']},
pincode : {type: Number, required: [true, 'Please enter pincode'] },
purchase_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Purchase'},
customer_id : {type: mongoose.Schema.Types.ObjectId, ref: 'Customer'}

});

const Shipping = mongoose.model("Shipping",shipSchema);


app.post("/newcustomer",function(req,res){
  const postData = req.body;

  const customer = new Customer(postData);
  customer.save(function(err)
  {
  if(!err)
  {

    res.status(200).send("Success");
  }
  else
  {
    res.status(404).send(err);
  }
  });


});


app.post("/:customerId/newpurchase",function(req,res){

  var purchase_data = req.body;
  purchase_data['customerId'] = req.params.customerId;



  const purchase = new Purchase(purchase_data);
  purchase.save(function(err)
  {
  if(!err)
  {

      res.status(200).send("Success");
  }
  else
  {
    res.status(404).send(err);
  }
  });

});


app.post("/:customerId/:purchaseId/shipment",function(req,res){
   var ship_details = req.body;
   ship_details['customer_id'] = req.params.customerId;
   ship_details['purchase_id'] = req.params.purchaseId;
   const shipping = new Shipping(ship_details);
   shipping.save(function(err)
   {
   if(!err)
   {
     res.status(200).send("Success");

   }
   else
   {
     res.status(404).send(err);
   }
   });



});

//URL should contain the query '?city=<cityname>'
app.get("/customers",function(req,res){
  const city = req.query.city;

//Using mongoose aggregate functions
Customer.aggregate([{
  $lookup: {
      from: "shippings",
      let: { city: "$city" },
      localField: "_id",
      foreignField: "customer_id",
      as: "shippingdetails",
      pipeline : [{$match :
        { $expr:
           {
                 $eq: [ "$city",  "$$city" ]

           }
        }

      },{$project : {
        __v : 0, customer_id : 0, city : 0
      }}]
  }
},{$project : {__v : 0}}]).exec(function(err, customers) {
if(err) throw err;
res.status(200).send(customers);

});

});


app.get("/customers/purchases",function(req,res){
  Customer.aggregate([{
    $lookup: {
        from: "purchases",
        localField: "_id",
        foreignField: "customerId",
        as: "PurchaseOrder",
        pipeline : [{$project : {
          __v : 0, customerId : 0
        }}]
    }
},{$project : {__v : 0}}]).exec(function(err, customers) {
  if(err) throw err;
  res.status(200).send(customers);

});
});


app.get("/customers/purchases/shipping",function(req,res){



  Customer.aggregate( [
   {
      $lookup:
         {
           from: "purchases",
           let: { cust_id: "$_id" },
           pipeline: [
              { $match:
                 { $expr:
                    {
                          $eq: [ "$customerId",  "$$cust_id" ]

                    }
                 }
              },
              {
                $lookup : {
                  from : "shippings",
                  localField : "_id",
                  foreignField : "purchase_id",
                  as : "Shippingdetails",
                  pipeline : [{$project :{__v : 0 , customer_id : 0, purchase_id : 0} }]
                }
              },
              {
                $project : {__v: 0, customerId : 0}
              }
           ],
           as: "PurchaseOrders"
         }
    }, {$project : {__v: 0}}
] ).exec(function(err, customers) {
  if(err) throw err;
  res.status(200).send(customers);

  });


});

//Start the server on port 3000 : Go to localhost:3000/
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
