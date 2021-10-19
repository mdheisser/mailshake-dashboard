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

const res = {
    businessEmail: "name@company.com",
    messageType: "Linkedin Message",
    picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Elon_Musk_-_The_Summit_2013.jpg/320px-Elon_Musk_-_The_Summit_2013.jpg",
    twitter: "elonmusk",
    website: "https://linkedin.com",
    occupation: "Entrepreneur",
    fullName: "Elon Musk",
    email: "kristian@linkedin.com",
    publicIdentifier: "tesla-motors",
    country: "United States of America",
    currentCompany: "Tesla",
    phone: "+1-202-555-0189",
    yearsInCurrentCompany: 3,
    totalCareerPositionsCount: 10,
    totalYearsInCareer: 20,
    collegeName: "University of Pennsylvania",
    status: "Replied",
    message: "Test message",
    threadId: "https://www.linkedin.com/messaging/thread/6520941171152285697",
    messageCreatedAt: "2019-12-09 18:13:59",
    firstName: "Elon",
    lastName: "Musk",
    lastStepExecution: "2019-12-09 18:13:59",
    linkedinProfile: "https://www.linkedin.com/in/elonmusk",
    uniqueLeadId: 123456,
    campaignName: "Test campaign name",
};

(async () => {
    try {
        const { client } = JSON.parse(event.body.queryStringParameters);

        // get account
        const account = await Airtable.getAccount(client);

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
            "In Campaign": 1,
        };

        const createdContact = await Airtable.createContact(account["Base ID"], newContact);

        // notify slack
        // remove zaps
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();

// 4/16/2021 6:00pm
