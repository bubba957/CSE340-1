// Needed Resources 
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/")
const ownController = require("../controllers/ownMeConttroller")
const Validate = require("../utilities/ownMe-validation")

// Route to build ownMe view
router.get("/ownMe", utilities.handleErrors(ownController.buildOwnMe));

// router.get("/", utilities.handleErrors(accountController.buildManagement));

module.exports = router;