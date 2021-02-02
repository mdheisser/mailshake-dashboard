const MailShakeApi = require("./mailshake");
const {
    getCampaign,
    getContacts,
    airtableToMailshake,
    updateCampaign,
    updateContacts,
} = require("./airtable");
const users = require("../../src/db/users");

module.exports = async (event) => {
    try {
        const body = JSON.parse(event.body);

        const { client, email, campaignID, recordID } = body;

        const foundUser = users.find((user) => user.client === client);

        const { id, campaign, campaignID } = await getCampaign(foundUser.airtableBase);

        // ----------------------------------------------

        // const { id, campaign, campaignID } = await getCampaign();
        // const airtableContacts = await getContacts();

        // const firstLiners = airtableContacts.filter((contact) => contact["First Line"] !== "");

        // if (firstLiners.length > 0) {
        //     const mailshakeContacts = airtableToMailshake(firstLiners);
        //     const summa = new MailShakeApi(process.env.REACT_APP_SUMMA_MEDIA);
        //     await summa.addToCampaign(campaignID, mailshakeContacts);

        //     await updateCampaign(id);
        //     await updateContacts(airtableContacts, campaign);
        // }

        return {
            statusCode: 200,
            body: JSON.stringify({ body: "Hello world" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};

// AIRTABLE --> MAILSHAKE
// campaign ID

// MAILSHAKE --> AIRTABLE
// airtable ID
