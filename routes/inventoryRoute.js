// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const Validate = require("../utilities/inv-validation")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build single view inventory item
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildDetail));

// Route to build management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to build classification view
router.get("/add-classification", utilities.handleErrors(invController.buildClassificationManagement));

// Route to build vehicle view
router.get("/add-inventory", utilities.handleErrors(invController.buildVehicleManagement));

// Process classification data
router.post("/add-classification", Validate.registationRules(), utilities.handleErrors(invController.registerClassification))

// Process vehicle data
router.post("/add-inventory", Validate.registationRules(), utilities.handleErrors(invController.registerVehicle))

module.exports = router;