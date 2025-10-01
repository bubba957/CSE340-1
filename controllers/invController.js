const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build single view inventory item
 * ************************** */
invCont.buildDetail = async function (req, res, next) {
  const inv_id = req.params.inv_id
  let vehicle = await invModel.getInventoryByInvId(inv_id)
  const htmlData = await utilities.buildVehicleDetail(vehicle)
  let nav = await utilities.getNav()
  const vehicleTitle = vehicle.inv_make + " " + vehicle.inv_model
  res.render("./inventory/detail", {
    title: vehicleTitle,
    nav,
    message: null,
    htmlData,
  })
}

/* ***************************
 *  Build management view
 * ************************** */
invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
  })
}

/* ***************************
 *  Build classification view
 * ************************** */
invCont.buildClassificationManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
  })
}

/* ***************************
 *  Build vehicle view
 * ************************** */
invCont.buildVehicleManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-inventory", {
    title: "Add Vehicle",
    nav,
  })
}

/* ***************************
 *  Process classification data
 * ************************** */
invCont.registerClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body
    const regResult = await invModel.registerClassification(classification_name)
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'ve added ${classification_name} to the classifications.`
      )
      res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
      })
    } else {
      req.flash("notice", 'Sorry, there was an error adding the classification.')
      res.status(501).render("inventory/add-classification", {
        title: "Add Classification",
        nav,
      })
    }
}

/* ***************************
 *  Process vehicle data
 * ************************** */
invCont.registerVehicle = async function (req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, classification_id } = req.body
    const regResult = await invModel.registerVehicle(inv_make, inv_model, inv_description, inv_image, inv_thumbnail, inv_price, inv_year, inv_miles, inv_color, classification_id)
    if (regResult) {
      req.flash(
        "notice",
        `Congratulations, you\'ve added ${inv_make} ${inv_model} to the inventory.`
      )
        res.status(201).render("inventory/management", {
        title: "Vehicle Management",
        nav,
      })
    } else {
      req.flash("notice", 'Sorry, there was an error adding the vehicle.')
      res.status(501).render("inventory/add-vehicle", {
        title: "Add Vehicle",
        nav,
      })
    }
}

module.exports = invCont