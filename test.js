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
    contact_id: "DX3kmR7n3RTedr4iExM9",
    first_name: "Ryan",
    last_name: "Roman",
    full_name: "Ryan Roman",
    email: "ryan@summamedia.co",
    phone: "+17152525716",
    tags: "",
    country: "US",
    date_created: "2021-11-08T16:21:23.912Z",
    full_address: "",
    contact_type: "lead",
    location: {
        name: "Summa Media",
        address: "445 Broadway",
        city: "Denver",
        state: "CO",
        country: "US",
        postalCode: "80203",
        fullAddress: "445 Broadway, Denver CO 80203",
        id: "S0O8LmhFAkVfgYlYFI1z",
    },
    campaign: {
        id: "UG5KH1EaDAo5r1i7WIbM",
        name: "Summa- Emails- Duro Jan 2022 Conference",
    },
    user: {
        firstName: "Nick ",
        lastName: "Peret",
        email: "nperet@summamedia.co",
        phone: "",
        extension: "",
    },
    message: {
        type: 3,
        body: '<div><a class="link-primary" target="_blank" href="https://msgsndr.com/message/email/viewer?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fhighlevel-backend.appspot.com%2Fo%2Flocation%252FS0O8LmhFAkVfgYlYFI1z%252Fcontact%252FDX3kmR7n3RTedr4iExM9%252FemailMessage%252FNX8peXi4CPbJhHdYspm3%3Falt%3Dmedia%26token%3D021b18d0-6d61-42ee-a38f-94a940303b7c">Click Here </a>to view the email</div>',
    },
};

(async () => {
    try {
        // TODO: get baseID from 'from' email
        // TODO:
    } catch (error) {
        console.log(error);
    }
})();
