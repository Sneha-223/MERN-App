const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	price: {
		type: Number
	},
	rating: {
		type: Number
	},
	type: {
		type: String,
		enum: ['Beauty', 'Tech', 'Fashion', 'Home', 'Stationery']
	},
	shop: {
		type: String,
		required: true
	},
	tags: [String]
});

module.exports = Product = mongoose.model("Products", ProductSchema);
