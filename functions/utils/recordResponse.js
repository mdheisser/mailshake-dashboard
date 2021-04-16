require("dotenv").config();

const AirtableApi = require("./airtable");
const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

const moment = require("moment");
const today = moment(new Date()).format("MM/DD/YYYY");

module.exports = async (event) => {
    try {
        // console.log("\n------------------ RES START ------------------\n");
        const res = JSON.parse(event.body);
        const { full_name, email, phone, campaign, message } = res;

        console.log(
            `\nCampaign: ${campaign.name} \nFrom: ${full_name} \nResponse: ${message.body}`
        );
        // console.log("\n------------------ RES END ------------------\n");

        const getCampaigns = await Airtable.getCampaigns("Text");
        const textCampaign = getCampaigns.find(
            (foundCampaign) => foundCampaign.Campaign === campaign.name
        );

        const contact = await Airtable.findTextContact(textCampaign["Base ID"], full_name);

        if (contact) {
            const updatedFields = {
                Responded: true,
                Response: message.body,
                "Response Date": today,
            };

            await Airtable.updateContact(textCampaign["Base ID"], contact, updatedFields);
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
