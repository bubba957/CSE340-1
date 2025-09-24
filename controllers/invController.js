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

module.exports = invCont