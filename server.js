const express = require("express");
const app = express();

const {Pool} = require("pg");

const pool = new Pool({
    user:"migracode",
    host:"localhost",
    database:"cyf_hotels",
    password:"occlaptop1",
    port:5432
})

app.get("/hotels",(req,res)=>{
    pool
    .query("SELECT * FROM hotels")
    .then((result)=> res.json(result.rows))
    .catch(e=> console.error(e))
})

app.get("/bookings",(req,res)=>{
    pool
    .query("SELECT nights FROM bookings")
    .then(result => res.json(result.rows))
    .catch(e=>console.error(e))
});

app.get("/customer",(req,res)=>{
    pool
    .query("SELECT * FROM customers WHERE id > 2")
    .then(result=> res.json(result.rows))
    .catch(e=>console.error(e))
})

app.get("/hotels/:hotelId",function (req,res) {
    const {hotelId} = req.params;

    pool
    .query("SELECT * FROM  hotels WHERE id=$1",[hotelId])
    .then(result => res.json(result.rows))
    .catch(e=>console.error(e))
})

app.get("/customers/:customerId",(req,res)=>{
    const {customerId} = req.params;

    pool
    .query("SELECT * FROM customers WHERE id=$1",[customerId])
    .then(result => res.json(result.rows))
    .catch(e => console.error(e));
})

app.get("/customers/:customerId/bookings", (req,res)=>{
    const {customerId} = req.params;

    pool
    .query("select b.checkin_date, b.nights,  h.name, h.postcode from bookings b  join hotels h on b.hotel_id = h.id  where b.customer_id  = $1",[customerId])
    .then(result => res.json(result.rows))
    .catch(e => console.error(e))
})

app.get("/customers/city/:city",(req,res)=>{
    const {city} = req.params;

    console.log("city",city);

    pool
        .query("SELECT * FROM customers WHERE city=$1",[city])
        // .query("SELECT * FROM customers")
        .then(result => res.json(result.rows))
        .catch(e => console.error(e));
})

/*
Add the GET endpoints /hotels and /hotels/:hotelId mentioned above and try to use these endpoints with Postman.
Add a new GET endpoint /customers to load all customers ordered by name.
Add a new GET endpoint /customers/:customerId to load one customer by ID.
Add a new GET endpoint /customers/:customerId/bookings to load all the bookings of a specific customer. Returns the following information: check in date, number of nights, hotel name, hotel postcode.*/



app.listen(3000,function () {
    console.log("I'm working right now");
})