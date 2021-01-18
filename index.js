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
            res.render("index", { shopData: result })
        })
        .catch(err => console.log(err))
})

app.get("/add", (req, res) => {
    shopItem.find()
        .then(result => {
            const productData = result
            const randomData = productData.sort(() => .5 - Math.random()).slice(0, 6)
            console.log("randomData: ", randomData)
            res.render('add', { productData, randomData })
        })
        .catch(err => console.log(err))
})



app.get("/weeklyrecommendations", (req, res) => {
    res.render("weeklyRecom")
})

app.get("/lessthan30", (req, res) => {
    res.render("less30")
})

app.post("/add-item", (req, res) => {
    // console.log(req.body);

    const newShopItem = new shopItem(req.body)
    newShopItem.save()
        .then(result => {
            res.redirect("/add")
        })
        .catch(err => console.log(err))
})

app.get("/single/:singleId", (req, res) => {
    // console.log(req.params.singleId);
    shopItem.findById(req.params.singleId)
        .then(result => {
            // res.send(result)
            res.render("single", { singleItem: result })
        })
        .catch(err => console.log(err))
})

app.post("/single/:id/edit", (req, res) => {
    console.log(req.body);
    // const updatedUser = {
    //     name: req.body.name,
    //     email: req.body.email,
    //     tel: req.body.tel,
    //     gender: req.body.gender,
    //     statement: req.body.statement
    // }
    shopItem.findByIdAndUpdate(req.params.id, req.body)
        .then(result => res.redirect(`/single/${req.params.id}`))
        .catch(err => console.log(err))
})

app.delete("/single/:id", (req, res) => {
    shopItem.findByIdAndDelete(req.params.id)
        .then(result => {
            // kein redirect möglich, da fetch ein AJAX request ist und JSON / Text erwartet
            //dh wir müssen JSON zurücksenden und den redirect im frontend lösen
            res.json({
                redirect: "/"
            })
        })
        .catch(err => console.log(err))
})