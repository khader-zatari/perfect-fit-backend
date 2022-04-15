//all order schema
const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem", required: true }],
    shippingAddress: { type: String, default: "" },
    city: { type: String, default: "" },
    zip: { type: String, default: "" },
    phone: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    shop: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    dateOrdered: { type: Date, default: Date.now },
});

exports.Order = mongoose.model("Order", orderSchema);
