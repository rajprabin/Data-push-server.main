const axios = require("axios");
const accountRepository = require("../account/repository");
const destinationRepository = require("../destination/repository");


const handler = async (req, res) => {
	try {
console.log(req)
		const { headers ,body} = req;

		const account = await accountRepository.getAcountUsingAppSecretToken(headers['cl-x-token']);

		if (!account) throw ({ statusCode: 401, error: 'Unauthenticated' });

		const destinations = await destinationRepository.getDestinationsUsingAccountId(account.id)

		for (const dest of destinations) {

			if (dest.httpMethod.toUpperCase() === 'GET') {
				await axios.get(dest.url, { params: body, headers: dest.headers });
			} else {
				await axios({
					method: dest.httpMethod.toUpperCase(),
					url: dest.url,
					data: body,
					headers: dest.headers,
				});
			}

		}

		return { data: "sucess" };
	} catch (error) {
		throw (error);
	}
}

module.exports = {
	handler
}