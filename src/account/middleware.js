const Joi = require("joi");

const createAccountInputValidation = (req, res, next) => {
	const createAccountSchema = Joi.object({
		email: Joi.string().email().required(),
		accountName: Joi.string().required(),
		website: Joi.string().optional()
	});

	const validate = createAccountSchema.validate(req.body);
	if (validate.error) return next({ status: false, error: validate.error, errorCode: 400 })
	next();
}

const updateAccountInputValidation = (req, res, next) => {
	const updateAccountSchema = Joi.object({
		email: Joi.string().email().optional(),
		accountName: Joi.string().optional(),
		website: Joi.string().optional()
	});

	const validate = updateAccountSchema.validate(req.body);
	if (validate.error) return next({ status: false, error: validate.error, errorCode: 400 })
	next();
}
module.exports = {
	createAccountInputValidation,
	updateAccountInputValidation
}