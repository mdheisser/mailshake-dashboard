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
        const textCampaigns = await Airtable.getCampaign("Farha - Nick Touch Point Follow Ups");
        console.log(textCampaigns);
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();

// 4/16/2021 6:00pm
