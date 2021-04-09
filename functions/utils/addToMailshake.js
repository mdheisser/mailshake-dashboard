require("dotenv").config();

const moment = require("moment");

const MailShakeApi = require("./mailshake");
const AirtableApi = require("./airtable");

const users = require("../../src/db/users");

const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

module.exports = async (event) => {
    try {
        const client = JSON.parse(event.body);

        const foundUser = users.find((user) => user.client === client);

        const [campaign] = await Airtable.getCampaign(foundUser.airtableBase);
        const airtableContacts = await Airtable.getContacts(foundUser.airtableBase);

        if (airtableContacts.length > 0) {
            const mailshakeContacts = Airtable.airtableToMailshake(airtableContacts);

            const Mailshake = new MailShakeApi(foundUser.mailshakeApi);
            await Mailshake.addToCampaign(campaign.id, mailshakeContacts);

            await Airtable.updateCampaign(foundUser.airtableBase, campaign.recordID);

            const updatedFields = {
                "In Campaign": true,
                Campaign: campaign.name,
                campaignID: campaign.id,
            };

            for (let airtableContact of airtableContacts) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 500);
                });

                await Airtable.updateContact(
                    foundUser.airtableBase,
                    airtableContact.recordID,
                    updatedFields
                );
            }
        }

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
