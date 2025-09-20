// // Needed Resources 
// const express = require("express")
// const router = new express.Router()
// const utilities = require("./utilities/")
// const accountController = require("../controllers/accountController")

// router.get("/account/login", accountController.buildLogin)

// app.use(async (err, req, res, next) => {
//   let nav = await utilities.getNav()
//   console.error(`Error at: "${req.originalUrl}": ${err.message}`)
//   if(err.status == 404){message = err.message} else {message = 'Uh Oh. Something went wrong!'}
//   res.render("errors/error", {
//     title: err.status || 'Server Error',
//     message,
//     nav
//   })
// })

// module.exports = router