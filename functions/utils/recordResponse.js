require("dotenv").config();

const { responseStatus } = require("./helpers");

const AirtableApi = require("./airtable");
const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

const moment = require("moment");
const today = moment(new Date()).format("MM/DD/YYYY");

module.exports = async (event) => {
    try {
        const res = JSON.parse(event.body);
        const { full_name, email, phone, campaign, message } = res;

        console.log(
            `\nCampaign: ${campaign.name} \nFrom: ${full_name} \nResponse: ${message.body}`
        );

        const getCampaigns = await Airtable.getCampaigns("Text");
        const textCampaigns = getCampaigns.filter(
            (foundCampaign) => foundCampaign.Campaign === campaign.name
        );

        for (let textCampaign of textCampaigns) {
            const contact = await Airtable.findTextContact(textCampaign["Base ID"], full_name);

            if (contact) {
                const updatedFields = {
                    Responded: true,
                    Response: message.body,
                    "Response Date": today,
                    Status: responseStatus(message.body),
                };

                await Airtable.updateContact(textCampaign["Base ID"], contact, updatedFields);
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ res }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: error }),
        };
    }
};
