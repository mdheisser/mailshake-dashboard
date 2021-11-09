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
        await slackNotification(process.env.SLACK_TWO_PERCENT_DM, `TEST`);
    } catch (error) {
        console.log(error);
    }
})();
