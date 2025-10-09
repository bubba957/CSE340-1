const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}
const ownModel = require("../models/ownMe-model")

module.exports = validate