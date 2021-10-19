const AirtableApi = require("./airtable");
const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

module.exports = async (event) => {
    try {
        const res = JSON.parse(event.body);

        const { client } = event.queryStringParameters;

        // get account
        const account = await Airtable.getClient(client);

        // create contact in clients base
        const newContact = {
            "Full Name": res.fullName,
            "First Name": res.firstName,
            "Last Name": res.lastName,
            "Company Name": res.currentCompany || "",
            Email: res.email || "",
            "Phone Number": res.phone || "",
            Outreach: "Skylead",
            Url: res.linkedinProfile || "",
            Response: res.message || "",
            Campaign: res.campaignName || "",
            "In Campaign": true,
            Responded: true,
            "Response Date": new Date(),
        };

        const createdContact = await Airtable.createContact(account["Base ID"], newContact);

        if (createdContact) {
            // notify slack
            await slackNotification(
                process.env.SLACK_SKYLEAD,
                `\n*Client:* ${client}\n*From:* ${res.fullName} \n*Message:* ${res.message}\n`
            );
        } else {
            // notify slack
            await slackNotification(
                process.env.SLACK_TWO_PERCENT_DM,
                `Error add Skylead contact for client: ${client}`
            );
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
