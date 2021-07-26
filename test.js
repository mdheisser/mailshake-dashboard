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

const GoogleSpreadsheetApi = require("./functions/utils/googleSheets");

const foundUser = users.find((user) => user.client === "Rooftek");

const today = moment(new Date()).format("YYYY-MM-DD");

const { responseStatus } = require("./functions/utils/helpers");

(async () => {
    try {
        await axios.post(process.env.SLACK_EMAIL_NOTIFICATIONS, {
            text: "\n*Client:* Greenscape\n*Campaign:* Revive Lost Leads\n*Response:* Coming soon...\n",
        });
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();

// 4/16/2021 6:00pm
