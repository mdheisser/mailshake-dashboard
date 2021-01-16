const MailShakeApi = require("./utils/mailshake");

exports.handler = async (event) => {
    try {
        const res = JSON.parse(event.body);

        const client = new MailShakeApi(res.client);
        const campaignTotals = await client.getAllScores(res.campaignID);

        return {
            statusCode: 200,
            body: JSON.stringify({ totals: campaignTotals }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
