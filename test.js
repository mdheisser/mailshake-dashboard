require("dotenv").config();

const axios = require("axios");
const moment = require("moment");

const fetch = require("node-fetch");

const users = require("./src/db/users");

const { responseStatus } = require("./functions/utils/helpers");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

const {
    liveCampaigns,
    campaignsToRun,
    campaignsDueToday,
    slackNotification,
} = require("./functions/utils/helpers");

// const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

const response = "stop";

const status = responseStatus(response);

console.log(status);

// (async () => {
//     try {
//         // TODO: get baseID from 'from' email
//         // TODO:
//     } catch (error) {
//         console.log(error);
//     }
// })();
