require("dotenv").config();

const axios = require("axios");
const moment = require("moment");

const fetch = require("node-fetch");

const users = require("./src/db/users");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

const {
    liveCampaigns,
    campaignsToRun,
    campaignsDueToday,
    slackNotification,
} = require("./functions/utils/helpers");

const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

(async () => {
    try {
        // const { client } = JSON.parse(event.body.queryStringParameters);
        const client = "Farha Roofing";

        // get account
        const [account] = await Airtable.getClient(client);

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
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();

// 4/16/2021 6:00pm
