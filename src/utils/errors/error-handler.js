const errorHandler = (err, req, res, next) => {
	if (err.error?.details && err.error.details[0]?.message) {
		const errorMessage = err.error.details[0].message.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')
		return res.status(400).send({ error: errorMessage })
	}
	else if (err.statusCode) {
		return res.status(err.statusCode).send({ error: err.error })
	};

	return res.status(500).send({ error: "Internal server error" })

};

module.exports = errorHandler