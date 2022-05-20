const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
    date:{
        type: Date
    },
    shop: {
        type: String
    },
    itemName: {
        type: String
    },
    quantity: {
        type: Number
    },
    status:{
        type: String,
        enum: ['Placed', 'Dispatched', 'In Transit', 'Delivered', 'Completed', 'Rejected']
    },
    cost:{
        type: Number
    },
    rating:{
        type: Number
    },
    buyer:{
        type: String
    }
});

module.exports = Order = mongoose.model("Orders", OrderSchema);
