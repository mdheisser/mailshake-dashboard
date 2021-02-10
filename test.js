const fetch = require("node-fetch");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

(async () => {
    try {
        // const client = "Rooftek";
        const client = "Summa Media";
        await fetch(
            "https://mailshake-dashboard-73415c.netlify.live/.netlify/functions/clientMailshake",
            {
                method: "POST",
                body: JSON.stringify(client),
            }
        );
        // ROOFTEK
        // const Mailshake = new MailShakeApi("5c5486f2-2237-4363-8ccf-2e862b54f687");
        // const campaign = await Mailshake.getCampaign(660899);
        // const listReplies = await Mailshake.getEmailAction(660899, "replied");
        // const emailsReplied = listReplies.map((reply) => reply.emailAddress);
        // console.log(emailsReplied);
        // SUMMA - AIRTABLE
        // const Airtable = new AirtableApi("key2tZxeaXDfyBJ9k");
        // const airtableContacts = await Airtable.getContacts("appPfAkOluijuGY1T");
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
