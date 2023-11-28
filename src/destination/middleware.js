const Joi = require("joi");

const createDestinationInputValidation = (req, res, next) => {
	const createDeatinationSchema = Joi.object({
		accountId: Joi.string().required(),
		url: Joi.string().required(),
		httpMethod: Joi.string().required(),
		headers: Joi.object().required()
	});

	const validate = createDeatinationSchema.validate(req.body);
	if (validate.error) return next({ status: false, error: validate.error })
	next();
}

const updateDestinationInputValidation = (req, res, next) => {
	const updateDestinationSchema = Joi.object({
		accountId: Joi.string().required(),
		url: Joi.string().required(),
		httpMethod: Joi.string().valid("POST","PUT","GET","DELETE","PATCH").required(),
		headers: Joi.object().required()
	});

	const validate = updateDestinationSchema.validate(req.body);
	if (validate.error) return next({ status: false, error: validate.error })
	next();
}



module.exports = {
	createDestinationInputValidation,
	updateDestinationInputValidation
}