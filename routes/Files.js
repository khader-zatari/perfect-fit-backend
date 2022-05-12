const express = require("express");
const router = express.Router();
const { exec } = require("child_process");

// router.get("/vto/:personImage/:clothImage", (req, res) => {
//     //const pythonOne = spawn("python3", ["file name of the assembly", req.params.imgName, req.params.clothImage]);
//     const pythonOne = spawn("python",['../test/test.py']);
//     pythonOne.stdout.on("data", (data) => {
//         data = data.toString();
//         res.status(200).send(data);
//         console.log("the file ran successfuly");
//     });
// });

router.get("/:clothUrlName/:personUrlName/:clothId/:personId", (req, res) => {

    var child = exec('python /var/www/html/folder/End_Project/assemble/assembling.py' + " " + req.params.clothUrlName +" "+ req.params.personUrlName +" " + req.params.clothId  + " "+req.params.personId);
    
    child.on('error', (error) => {
        console.log(`child process creating error with error ${error}`);
      });

      child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.sendStatus(200); 
      });
});

module.exports = router;
