require("dotenv").config();

const fetch = require("node-fetch");

const users = require("./src/db/users");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

const GoogleSpreadsheetApi = require("./functions/utils/googleSheets");

const foundUser = users.find((user) => user.client === "Summa Media");

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
        //
        //
        // GOOGLE SHEETS
        // const GoogleSpreadsheet = new GoogleSpreadsheetApi(
        //     "1JEGup18CLuqATWKPcJYF6jUBXWtQNBvSjxPBVZaPZLk"
        // );
        // await GoogleSpreadsheet.appendProspect(["Ryan Roman"]);
        //
        // AIRTABLE
        // const Airtable = new AirtableApi(foundUser.airtableApi);
        // const campaign = await Airtable.getCampaign(foundUser.airtableBase, "Specific");
        // console.log(campaign);
        // const contacts = await Airtable.getContacts(foundUser.airtableBase);
        // console.log(contacts.length);
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();
