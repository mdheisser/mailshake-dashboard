require("dotenv").config();

const MailShakeApi = require("./mailshake");
const AirtableApi = require("./airtable");

const users = require("../../src/db/users");

module.exports = async (event) => {
    try {
        const foundUser = users.find(({ client }) => client === "Summa Media");

        const summaAirtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

        const campaign = await summaAirtable.getCampaign(foundUser.airtableBase);
        const airtableContacts = await summaAirtable.getContacts(foundUser.airtableBase);

        const mailshakeContacts = summaAirtable.airtableToMailshake(airtableContacts);

        const summaMailshake = new MailShakeApi(process.env.REACT_APP_SUMMA_MEDIA);
        await summaMailshake.addToCampaign(campaign.id, mailshakeContacts);

        await summaAirtable.updateCampaign(foundUser.airtableBase, campaign.recordID);
        await summaAirtable.updateContacts(foundUser.airtableBase, airtableContacts, campaign);

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
