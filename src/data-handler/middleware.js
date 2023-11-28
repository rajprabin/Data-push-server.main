const Joi = require("joi");

const dataHandlerInputValidation = (req, res, next) => {
	const { headers } = req;

	const appSecretToken = headers['cl-x-token'];
	
	if (!appSecretToken) return next({ statusCode: 401, error: 'Unauthenticated' });


	const dataHandlerBodySchema = Joi.object();

	const validate = dataHandlerBodySchema.validate(req.body);

	if (validate.error) return next({ statusCode: 400, error: validate.error });

	next();
}

module.exports = { dataHandlerInputValidation };