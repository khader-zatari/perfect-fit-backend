const { User } = require("../Models/User");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//get all the stores

router.get("/", async (req, res) => {
    const stores = await User.find({ isAdmin: true }); //here without password select

    if (!stores) {
        res.status(500).json({ success: false });
    }
    res.send(stores);
});

//get a specific store
router.get("/:id", async (req, res) => {
    const stores = await User.findById(req.params.id);

    if (!stores) {
        res.status(500).json({ success: false });
    }
    res.send(stores);
});

module.exports = router;
