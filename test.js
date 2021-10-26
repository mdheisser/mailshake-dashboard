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

(async () => {
    try {
        const { full_name, campaign, message } = {
            full_name: "Ryan Roman",
            campaign: { name: "Summa - 15 Minutes" },
        };

        let contact = await Airtable.findTextContactByID(
            "appPfAkOluijuGY1T",
            "mCaQz89CgOX5EI7Z1AG8"
            // "asdf"
        );

        if (!contact) {
            contact = await Airtable.findTextContact("appPfAkOluijuGY1T", full_name, campaign.name);
        }

        console.log(contact);
    } catch (error) {
        console.log("ERROR FETCHING ---", error);
    }
})();

// 4/16/2021 6:00pm

// let test = {
//     contact_id: "6IOXFwyjVJdQ65C8FTz3",
//     first_name: "Ryan",
//     last_name: "Roman",
//     full_name: "Ryan Roman",
//     email: "rtroman14@gmail.com",
//     phone: "+17152525716",
//     tags: "",
//     date_created: "2021-06-16T19:06:51.483Z",
//     contact_source: "chat widget",
//     full_address: "",
//     contact_type: "lead",
//     gclid: null,
//     location: {
//         name: "Summa Media",
//         address: "445 Broadway",
//         city: "Denver",
//         state: "CO",
//         country: "US",
//         postalCode: "80203",
//         fullAddress: "445 Broadway, Denver CO 80203",
//         id: "S0O8LmhFAkVfgYlYFI1z",
//     },
//     message: { type: 2, body: "This is a test", direction: "inbound", status: "delivered" },
//     contact: {
//         attributionSource: {
//             referrer: null,
//             utmMedium: null,
//             utmContent: null,
//             utmSource: null,
//             ip: "50.198.193.92",
//             url: "https://summamedia.co/",
//             userAgent:
//                 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36",
//             sessionSource: "Direct traffic",
//             fbp: "fb.1.1623870392833.700556658",
//             gclid: null,
//         },
//         lastAttributionSource: {
//             utmMedium: null,
//             gclid: null,
//             referrer: null,
//             sessionSource: "Direct traffic",
//             utmContent: null,
//             utmSource: null,
//             userAgent:
//                 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
//             url: "https://summamedia.co/",
//             ip: "2601:445:37f:9ab0:49ed:c62d:bc7e:56e0",
//         },
//     },
//     attributionSource: {},
// };
