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
    contact_id: "k4KC3H1Jih6AvzG1doyZ",
    first_name: "Jim",
    last_name: "Osbon",
    full_name: "Jim Osbon",
    email: "jim@4smartmoney.com",
    phone: "+17605748700",
    tags: "",
    address1: "24795 Interstate 35",
    city: "Kyle",
    state: "TX",
    country: "US",
    date_created: "2021-11-05T15:14:46.571Z",
    postal_code: "78640",
    contact_source: "api v1",
    full_address: "24795 Interstate 35 Kyle TX 78640",
    contact_type: "lead",
    location: {
        name: "Roper Roofing & Solar",
        address: "795 McIntyre Street",
        city: "Golden",
        state: "CO",
        country: "US",
        postalCode: "80401",
        fullAddress: "795 McIntyre Street, Golden CO 80401",
        id: "j5GScSbe6pa8vcnj7HPR",
    },
    campaign: {
        id: "0MurKEAvAjuqxEFd0ky5",
        name: "Roper - TEXAS Casual Campaign",
    },
    user: {
        firstName: "Johno",
        lastName: "Skeeters",
        email: "johno@roperroofingco.com",
        phone: "",
        extension: "",
    },
    message: {
        type: 2,
        body: "Austin TX?",
        direction: "inbound",
        status: "delivered",
    },
};

(async () => {
    try {
        // const res = JSON.parse(event.body);
        const { full_name, campaign, message, contact_id } = res;

        const textCampaign = await Airtable.getCampaign(campaign.id);

        let contact = await Airtable.findTextContactByID(textCampaign["Base ID"], contact_id);

        if (!contact) {
            contact = await Airtable.findTextContact(
                textCampaign["Base ID"],
                full_name,
                campaign.name
            );
        }

        if (contact && !("Responded" in contact)) {
            const Status = responseStatus(message.body);

            const updatedFields = {
                Responded: true,
                Response: message.body,
                "Response Date": new Date(),
                Status,
            };

            await Airtable.updateContact(textCampaign["Base ID"], contact.recordID, updatedFields);

            console.log(
                `\nClient: ${textCampaign.Client}\nCampaign: ${campaign.name} \nFrom: ${full_name} \nResponse: ${message.body}\n`
            );

            Status === null &&
                (await slackNotification(
                    process.env.SLACK_TEXT_NOTIFICATIONS,
                    `\n*Client:* ${textCampaign.Client}\n*Campaign:* ${campaign.name} \n*From:* ${full_name} \n*Response:* ${message.body}\n`
                ));
        }

        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({ res }),
        // };
    } catch (error) {
        console.log(error);
        // return {
        //     statusCode: 500,
        //     body: JSON.stringify({ msg: error }),
        // };
    }
})();
