const { OrderItem } = require("../models/order-item");
const { Order } = require("../models/order");

const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
    const orderList = await Order.find().populate("RegularUser", "name").sort({ dateOrdered: -1 });
    if (!orderList) {
        res.status(500).json({ success: false });
    }
    res.send(orderList);
});
router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate("RegularUser", "name")
        .populate({
            //object
            path: "OrderItems",
            populate: {
                path: "Product",
                populate: "category",
            },
        });

    if (!order) {
        res.status(500).json({ success: false });
    }
    res.send(order);
});
router.post("/", async (req, res) => {
    const orderItemsIds = Promise.all(
        req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product,
            });

            newOrderItem = await newOrderItem.save();

            return newOrderItem._id; // return just the id of the orders items
        })
    );
    //all the ids of the items in the order
    const orderItemsIdsResolved = await orderItemsIds;
    const totalPrices = await Promise.all(
        orderItemsIdsResolved.map(async (orderItemId) => {
            const orderItem = await OrderItem.findById(orderItemId).populate("product", "price");
            const totalPrice = orderItem.product.price * orderItem.quantity;
            return totalPrice;
        })
    );

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0); // sum of all numbers in an array

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    });
    order = await order.save();

    if (!order) return res.status(400).send("the order cannot be created!");

    res.send(order);
});
router.put("/:id", async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status,
        },
        { new: true }
    );
    if (!order) return res.status(400).send("the order cannot be update!");
    res.send(order);
});
router.delete("/:id", async (req, res) => {
    order = Order.findByIdAndRemove(req.params.id);
    if (order) {
        await order.orderItems.map(async (orderItem) => {
            await OrderItem.findByIdAndRemove(orderItem);
        });
        return res.status(200).json({ success: true, message: "the order is deleted!" });
    } else {
        return res.status(404).json({ success: false, message: "order not found!" });
    }
});

module.exports = router;
