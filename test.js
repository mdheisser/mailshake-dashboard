require("dotenv").config();

const fetch = require("node-fetch");

const users = require("./src/db/users");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

const {
    liveCampaigns,
    campaignsToRun,
    campaignsToRunUpdate,
} = require("./functions/utils/helpers");

const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

const GoogleSpreadsheetApi = require("./functions/utils/googleSheets");

const foundUser = users.find((user) => user.client === "Rooftek");

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
        // AIRTABLE
        // const Airtable = new AirtableApi(foundUser.airtableApi);
        // const campaigns = await Airtable.getCampaign(foundUser.airtableBase, "Specific");
        // for (let campaign of campaigns) {
        //     if (campaign.tag !== "") {
        //         console.log(`First Line Ready - ${campaign.tag}`);
        //         const airtableContacts = await Airtable.getContacts(
        //             foundUser.airtableBase,
        //             `First Line Ready - ${campaign.tag}`
        //         );
        //         console.log(airtableContacts);
        //     }
        // }
        //
        // GET CAMPAIGNS
        const getCampaigns = await Airtable.getCampaigns();
        let campaigns = liveCampaigns(getCampaigns);
        campaigns = campaignsToRun(campaigns);

        // campaigns = campaigns.map((campaign) => ({
        //     client: campaign.Client,
        //     campaign: campaign.Campaign,
        // }));

        console.log(campaigns);
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();
