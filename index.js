require("dotenv").config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001
app.use(express.static("public"))
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoose = require("mongoose")
// const dbUri = "mongodb+srv://design:design1@designshopdb.rfchl.mongodb.net/designshopDB?retryWrites=true&w=majority"
const shopItem = require("./models/shopItem")

mongoose.connect(process.env.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("Connected to my DB");
        app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
    })
    .catch(err => console.log(err))

app.get("/", (req, res) => {
    shopItem.find()
    .then(result => {
        res.render("index", {shopData: result})
    })
    .catch(err => console.log(err))
})

app.get("/add", (req, res) => {
    res.render("add")
})

app.get("/weeklyrecommendations", (req, res) => {
    res.render("weeklyRecom")
})

app.get("/lessthan30", (req, res) => {
    res.render("less30")
})

app.post("/add-item", (req, res) => {
    console.log(req.body);
    
    const newShopItem = new shopItem({
        productName: req.body.productName,
        company: req.body.company,
        price: req.body.price,
        productImgUrl: req.body.productImgUrl,
        shopUrl: req.body.shopUrl,
        description: req.body.description
    })
    newShopItem.save()
    .then(result => {
        res.redirect("/add")
    })
    .catch(err => console.log(err))
})

app.get("/single/:singleId", (req, res) => {
    console.log(req.params.singleId);
    shopItem.findById(req.params.singleId)
        .then(result => {
            // res.send(result)
            res.render("single", { singleItem: result })
        })
        .catch(err => console.log(err))
})