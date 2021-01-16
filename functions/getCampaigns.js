const MailShakeApi = require("./utils/mailshake");

exports.handler = async (event) => {
    try {
        const res = JSON.parse(event.body);

        const client = new MailShakeApi(res.client);
        const getCampaigns = await client.listCampaigns();

        return {
            statusCode: 200,
            body: JSON.stringify({ campaigns: getCampaigns.results }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
