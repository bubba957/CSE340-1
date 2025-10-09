const ownModel = require("../models/ownMe-model");
const utilities = require("../utilities/");

/* ***************************
 *  Build the ownMe view
 * ************************** */
async function buildOwnMe(req, res, next) {
  let nav = await utilities.getNav()
    res.render("./ownMe/ownMe", {
        title: "Own Today",
        nav,
    })
    console.log("rendering ownMe")
}

module.exports = { buildOwnMe }