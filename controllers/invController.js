const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build management view
 * ************************** */
async function buildManagement(req, res, next) {
  let nav = await utilities.getNav()
    res.render("./inventory/management", {
        title: "Vehicle Management",
        nav,
        classificationSelect,
    })
}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
async function buildByClassificationId(req, res, next) {
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
async function buildDetail(req, res, next) {
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
 *  Build classification view
 * ************************** */
async function buildClassificationManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("./inventory/add-classification", {
    title: "Add Classification",
    nav,
  })
}

/* ***************************
 *  Build vehicle view
 * ************************** */
async function buildVehicleManagement(req, res, next) {
  let nav = await utilities.getNav()
  const classificationSelect = await utilities.buildClassificationList()
  res.render("./inventory/add-inventory", {
    title: "Add Vehicle",
    nav,
    // errors: null,
    classificationSelect,
  })
}

/* ***************************
 *  Process classification data
 * ************************** */
async function registerClassification(req, res) {
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
async function registerVehicle(req, res) {
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

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
async function getInventoryJSON(req, res, next) {
  const classification_id = parseInt(req.params.classification_id)
  const invData = await invModel.getInventoryByClassificationId(classification_id)
  if (invData[0].inv_id) {
    return res.json(invData)
  } else {
    next(new Error("No data returned"))
  }
}

/* ***************************
 *  Build the edit vehicle view
 * ************************** */
async function buildEditView(req, res, next) {
  const inv_id = parseInt(req.params.inv_id)
  let nav = await utilities.getNav()
  const itemData = await invModel.getInventoryByInvId(inv_id)
  const classificationSelect = await utilities.buildClassificationList(itemData.classification_id)
  const itemName = `${itemData.inv_make} ${itemData.inv_model}`
  res.render("./inventory/edit-inventory", {
    title: "Edit " + itemName,
    nav,
    classificationSelect: classificationSelect,
    errors: null,
    inv_id: itemData.inv_id,
    inv_make: itemData.inv_make,
    inv_model: itemData.inv_model,
    inv_year: itemData.inv_year,
    inv_description: itemData.inv_description,
    inv_image: itemData.inv_image,
    inv_thumbnail: itemData.inv_thumbnail,
    inv_price: itemData.inv_price,
    inv_miles: itemData.inv_miles,
    inv_color: itemData.inv_color,
    classification_id: itemData.classification_id
  })
}

module.exports = {
  buildByClassificationId,
  buildDetail,
    buildManagement,
    buildClassificationManagement,
    buildVehicleManagement,
    registerClassification,
    registerVehicle,
    getInventoryJSON,
    buildEditView,
}