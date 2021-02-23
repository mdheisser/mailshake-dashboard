require("dotenv").config();

const fetch = require("node-fetch");

const users = require("./src/db/users");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

const GoogleSpreadsheetApi = require("./functions/utils/googleSheets");

(async () => {
    try {
        // const Mailshake = new MailShakeApi("726811af-7c60-4fa4-8cb4-85c443779855");
        // // nick.peret lead gen 1.5.21 --> 646229
        // // nperet lead gen 1.5.21 --> 646218
        // // nickperet lead gen 1.5.21 --> 646146
        // const listOfReplies = await Mailshake.getEmailAction(646229, "replied");
        // const emailsReplied = listOfReplies.map((reply) => reply.emailAddress);
        // console.log(emailsReplied);
        // const client = "Rooftek";
        // const client = "Summa Media";
        // await fetch("https://mailshake-dashboard.netlify.app/.netlify/functions/clientMailshake", {
        //     method: "POST",
        //     body: JSON.stringify(client),
        // });
        // MAILSHAKE
        // const foundUser = users.find((user) => user.client === "Hornet");
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
        // SUMMA - AIRTABLE
        // const Airtable = new AirtableApi(api);
        // const prospect = await Airtable.getContact("appPfAkOluijuGY1T", "recBw3M77awRVj5fP");
        // console.log(prospect);
        // console.log([
        //     `${prospect.first_name} ${prospect.last_name} ${prospect.company_name}`,
        //     "recordID",
        // ]);
        // const campaign = await Airtable.getCampaign("appPfAkOluijuGY1T");
        // console.log(campaign);
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();
