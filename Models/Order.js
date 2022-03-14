//all order schema
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem", required: true }],
    shippingAddress1: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    phone: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "RegularUser" },
    dateOrdered: { type: Date, default: Date.now },
});

exports.Order = mongoose.model("Order", OrderSchema);
