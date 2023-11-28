const crypto = require('crypto');

const getToken = (size) => {
	const token = crypto.randomBytes(size);
	return token.toString("hex")
}

module.exports = getToken
