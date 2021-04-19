require("dotenv").config();

const moment = require("moment");

const fetch = require("node-fetch");

const users = require("./src/db/users");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

const { liveCampaigns, campaignsToRun, campaignsDueToday } = require("./functions/utils/helpers");

const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

const GoogleSpreadsheetApi = require("./functions/utils/googleSheets");

const foundUser = users.find((user) => user.client === "Rooftek");

const today = moment(new Date()).format("YYYY-MM-DD");

(async () => {
    try {
        // const Mailshake = new MailShakeApi(foundUser.mailshakeApi);
        // const listOfReplies = await Mailshake.getEmailAction(646229, "replied");
        // const emailsReplied = listOfReplies.map((reply) => reply.emailAddress);
        // console.log(emailsReplied);
        // const client = "Rooftek";
        // const client = "Summa Media";
        // await fetch("https://mailshake-dashboard.netlify.app/.netlify/functions/clientMailshake", {
        //     method: "POST",
        //     body: JSON.stringify(client),
        // });
        //
        // MAILSHAKE
        // const Mailshake = new MailShakeApi(foundUser.mailshakeApi);
        // const campaigns = await Mailshake.listCampaigns();
        // console.log(campaigns);
        // const listOfReplies = await Mailshake.getEmailAction(681215, "replied");
        // const emailsReplied = listOfReplies.map((reply) => reply.emailAddress);
        // console.log(listOfReplies);
        // console.log(listOfReplies.length);
        //
        // GOOGLE SHEETS
        // const GoogleSpreadsheet = new GoogleSpreadsheetApi(
        //     "1JEGup18CLuqATWKPcJYF6jUBXWtQNBvSjxPBVZaPZLk"
        // );
        // await GoogleSpreadsheet.appendProspect(["Ryan Roman"]);
        //

        // GET CAMPAIGNS
        // const getCampaigns = await Airtable.getCampaigns();
        // let campaigns = liveCampaigns(getCampaigns);
        // campaigns = campaignsDueToday(campaigns);
        // campaigns = campaignsToRun(campaigns);
        // console.log(campaigns);

        // GET CONTACT BY
        // const campaign = {
        //     name: "Norman Mobile Numbers",
        // };
        // const full_name = "Kandi Malphrus";
        // const message = {
        //     response: "Can Ben give me a call today",
        // };

        // const getCampaigns = await Airtable.getCampaigns("Text");
        // const textCampaigns = getCampaigns.filter(
        //     (foundCampaign) => foundCampaign.Campaign === campaign.name
        // );

        // for (let textCampaign of textCampaigns) {
        //     const contact = await Airtable.findTextContact(textCampaign["Base ID"], full_name);

        //     if (contact) {
        //         console.log(textCampaign.Client);
        //         console.log(contact);
        //     }
        // }
        //
        // FILTER MESSAGES
        // const message = "You have the wrong number";

        // const coldResponse = require("./functions/utils/keywords");

        // const re = new RegExp(coldResponse, "i");

        // if (re.test(message)) {
        //     console.log("TRUE");
        // }

        //

        const { responseStatus } = require("./functions/utils/helpers");

        console.log(responseStatus("Stop by"));
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();
