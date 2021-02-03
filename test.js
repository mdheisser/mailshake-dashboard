const fetch = require("node-fetch");

const MailShakeApi = require("./functions/utils/mailshake");

(async () => {
    try {
        // const client = "Rooftek";
        const client = "Summa Media";

        await fetch(
            "https://mailshake-dashboard-40442c.netlify.live/.netlify/functions/clientMailshake",
            {
                method: "POST",
                body: JSON.stringify(client),
            }
        );

        // ROOFTEK
        // const Mailshake = new MailShakeApi(api);
        // const campaigns = await Mailshake.listCampaigns();

        // console.log(campaigns);
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();
