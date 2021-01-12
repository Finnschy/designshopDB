const mongoose = require('mongoose')

const Schema = mongoose.Schema

const shopItemSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productImgUrl: {
        type: String,
        required: true
    },
    shopUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }

}, {timestamps: true})

const ShopItem = mongoose.model('ShopItem', shopItemSchema)

module.exports = ShopItem