const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.get("/vto/:personImage/:clothImage", (req, res) => {
    const pythonOne = spawn("python3", ["file name of the assembly", req.params.imgName, req.params.clothImage]);
    pythonOne.stdout.on("data", (data) => {
        data = data.toString();
        res.status(200).send(data);
        console.log("the file ran successfuly");
    });
});

module.exports = router;
