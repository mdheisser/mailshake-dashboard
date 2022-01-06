require("dotenv").config();

const axios = require("axios");
const moment = require("moment");

const fetch = require("node-fetch");

const users = require("./src/db/users");

const { responseStatus } = require("./functions/utils/helpers");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

// let { data } = await axios.get(`${url}1`);

const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

// const response = "stop";

// const status = responseStatus(response);

// console.log(status);

(async () => {
    try {
        const res = await Airtable.getLocation("ZDAvMkrHGp1n1l8f6W9r");
        console.log(res);
    } catch (error) {
        console.log(error);
    }
})();
