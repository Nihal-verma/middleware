const express = require("express")
const {upload} = require("../middleware/middleware")
const router = express.Router()
const collectdata = require("../controller/api")

const {filterAge}= require("../middleware/middleware")


router.post("/register",filterAge, collectdata.register)
router.get("/get/:id",collectdata.getdata)
router.delete("/delete/:id",collectdata.deletedata)
router.post("/file",upload,collectdata.filesend)
router.put("/update/:id",collectdata.updatealldata)

module.exports = router;
