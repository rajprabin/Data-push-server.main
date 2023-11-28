const express = require("express");
const { dataHandlerInputValidation } = require("./middleware");
const dataHandlerService = require("./service");
const router = express.Router();


router.post('/', [dataHandlerInputValidation], async (req, res, next) => {
	try {
		const result = await dataHandlerService.handler(req, res)
		if (result.data) return res.status(200).send(result.data)
	} catch (error) {
		console.error("Error in handling data ::", error);
		next(error)
	}
});



module.exports = router;