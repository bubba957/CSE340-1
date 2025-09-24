// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
// const detailController = require("../controllers/detailController") 

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build single view inventory item
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildDetail));

module.exports = router;