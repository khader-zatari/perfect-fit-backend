//single order schema
const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
    quantity: { type: Number, required: true },
    color: { type: String, require: true },
    size: { type: String, require: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
});

exports.OrderItem = mongoose.model("OrderItem", orderItemSchema);
