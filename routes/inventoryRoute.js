// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const invController = require("../controllers/invController")
const Validate = require("../utilities/inv-validation")

// Route to build management view
router.get("/", utilities.handleErrors(invController.buildManagement));

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

// Route to build single view inventory item
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildDetail));

// Route to build classification view
router.get("/add-classification", utilities.handleErrors(invController.buildClassificationManagement));

// Process classification data
router.post("/add-classification", Validate.registationRules(), utilities.handleErrors(invController.registerClassification));

// Route to build vehicle view
router.get("/add-inventory", utilities.handleErrors(invController.buildVehicleManagement));

// Process vehicle data
router.post("/add-inventory", Validate.registationRules(), utilities.handleErrors(invController.registerVehicle));

// Route to build delete view
router.get("/delete/:inv_id", utilities.handleErrors(invController.buildDeleteView));

// Process delete vehicle
router.post("/delete/", utilities.handleErrors(invController.deleteItem));

// Route to get inventory by classification as JSON
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// Route to build edit view
router.get("/edit/:inv_id", utilities.handleErrors(invController.buildEditView));

module.exports = router;