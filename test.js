const fetch = require("node-fetch");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");

(async () => {
    try {
        // const client = "Rooftek";
        const client = "Summa Media";
        await fetch(
            "https://mailshake-dashboard-9dc4b3.netlify.live/.netlify/functions/clientMailshake",
            {
                method: "POST",
                body: JSON.stringify(client),
            }
        );
        // ROOFTEK
        // const Mailshake = new MailShakeApi(api);
        // const campaigns = await Mailshake.listCampaigns();
        // console.log(campaigns);
        // ROOFTEK - AIRTABLE
        // const Airtable = new AirtableApi(key);
        // const campaign = await Airtable.getCampaign("app115xQzw1jhn5U8");
        // console.log(campaign);
        // await Airtable.updateCampaign("app115xQzw1jhn5U8", campaign.recordID);
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();
