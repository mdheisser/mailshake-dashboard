require("dotenv").config();

const fetch = require("node-fetch");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

const GoogleSpreadsheetApi = require("./functions/utils/googleSheets");

(async () => {
    try {
        // const client = "Rooftek";
        // const client = "Summa Media";
        // await fetch("https://mailshake-dashboard.netlify.app/.netlify/functions/clientMailshake", {
        //     method: "POST",
        //     body: JSON.stringify(client),
        // });
        // ROOFTEK
        // const Mailshake = new MailShakeApi(api);
        // const campaign = await Mailshake.getCampaign(660899);
        // const listReplies = await Mailshake.getEmailAction(660899, "replied");
        // const emailsReplied = listReplies.map((reply) => reply.emailAddress);
        // console.log(listReplies);
        //
        //
        // GOOGLE SHEETS
        const GoogleSpreadsheet = new GoogleSpreadsheetApi(
            "18HJ7UdA6BC4J89EQLinI9rsWfxO2EEzeF5hn3xXcct8"
        );
        await GoogleSpreadsheet.appendProspect(["Ryan Roman"]);
        // console.log(process.env.GOOGLE_PRIVATE_KEY_2);
        //
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
        // const today = moment(new Date()).format("MM/DD/YYYY");
        // const updatedFields = {
        //     "In Mailshake": true,
        //     Campaign: campaign.name,
        //     campaignID: campaign.id,
        //     "Mailshake Upload Date": today,
        // };
        // for (let airtableContact of airtableContacts) {
        //     await new Promise((resolve) => {
        //         setTimeout(resolve, 500);
        //     });
        //     await Airtable.updateContact(
        //         "appPfAkOluijuGY1T",
        //         airtableContact.recordID,
        //         updatedFields
        //     );
        // }
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();
