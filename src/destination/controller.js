const express = require("express");
const router = express.Router();
const destinationService = require("./service");
const { createDestinationInputValidation, updateDestinationInputValidation } = require("./middleware");

router.post('/', [createDestinationInputValidation], async (req, res, next) => {
	try {
		const result = await destinationService.createDestination(req);
		if (result.data) return res.status(200).send(result.data);
	} catch (error) {
		console.error("Error in create destinations ::", error);
		next(error)
	}


});

router.get('/:accountId', async (req, res, next) => {
	try {
		const result = await destinationService.getAccountDestination(req);
		if (result.data) return res.status(200).send(result.data);
	} catch (error) {
		console.error("Error in get destinations ::", error);
		next(error)
	}
});


router.put('/:destinationId', [updateDestinationInputValidation], async (req, res, next) => {

	try {
		const result = await destinationService.updateDestination(req);
		if (result.data) return res.status(200).send(result.data);
	} catch (error) {
		console.error("Error in get destinations ::", error);
		next(error)
	}

});


router.delete('/:destinationId', async (req, res, next) => {
	try {
		const result = await destinationService.deleteDestination(req);
		if (result.data) return res.status(200).send(result.data);
	} catch (error) {
		console.error("Error in get destinations ::", error);
		next(error)
	}
});

module.exports = router;