const MailShakeApi = require("./mailshake");
const AirtableApi = require("./airtable");

const users = require("../../src/db/users");

const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

module.exports = async (event) => {
    try {
        const client = JSON.parse(event.body);

        const foundUser = users.find((user) => user.client === client);

        const campaign = await Airtable.getCampaign(foundUser.airtableBase);
        const airtableContacts = await Airtable.getContacts(foundUser.airtableBase);

        const mailshakeContacts = Airtable.airtableToMailshake(airtableContacts);

        console.log(mailshakeContacts);

        // const Mailshake = new MailShakeApi(foundUser.mailshakeApi);
        // await Mailshake.addToCampaign(campaign.id, mailshakeContacts);

        // await summaAirtable.updateCampaign(foundUser.airtableBase, campaign.recordID);
        // await summaAirtable.updateContacts(foundUser.airtableBase, airtableContacts, campaign);

        return {
            statusCode: 200,
            body: JSON.stringify({ campaign }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
