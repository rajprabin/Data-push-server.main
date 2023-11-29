const express = require("express");
const accountService = require("./service");
const { createAccountInputValidation, updateAccountInputValidation } = require("./middleware");
const router = express.Router();


router.post('/', [createAccountInputValidation], async (req, res, next) => {
	try {
		const result = await accountService.createAccount(req, res)
		if (result.data) return res.status(201).send(result.data)
	} catch (error) {
		console.error("Error in create account ::", error);
		next(error)
	}
});

router.get('/', async (req, res, next) => {
	try {
		const result = await accountService.getAccounts(req)
		if (result.data) return res.status(200).send(result.data)
	} catch (error) {
		console.error("Error in retriving account ::", error);
		next(error)
	}
});

// Edit an existing account
router.put('/:accountId', [updateAccountInputValidation], async (req, res, next) => {
	try {
		const result = await accountService.updateAccount(req)
		if (result.data) return res.status(200).send(result.data)
	} catch (error) {
		console.error("Error in retriving account ::", error);
		next(error)
	}

});

router.delete('/:accountId', async (req, res,next) => {
	try {
		const result = await accountService.deleteAccount(req)
		if (result.data) return res.status(200).send(result.data)
	} catch (error) {
		console.error("Error in retriving account ::", error);
		next(error)
	}
});





module.exports = router;