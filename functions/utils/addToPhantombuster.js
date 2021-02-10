require("dotenv").config();

const MailShakeApi = require("./mailshake");
const AirtableApi = require("./airtable");
const { appendProspect } = require("./googleSheets");
const users = require("../../src/db/users");

const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

module.exports = async (event) => {
    try {
        const res = JSON.parse(event.body);
        const { recordID, campaignID, email, client } = res;

        const foundUser = users.find((user) => user.client === client);

        // get campaign
        // see if contact responded
        // IF responded
        // update airtable
        // ELSE not responded
        // send to phantombuster URL finder
        // const prospect = await appendProspect(res.client);

        const Mailshake = new MailShakeApi(foundUser.mailshakeApi);
        const listOfReplies = await Mailshake.getEmailAction(campaignID, "replied");
        const emailsReplied = listOfReplies.map((reply) => reply.emailAddress);

        if (emailsReplied.includes(email)) {
            await Airtable.updateContacts(foundUser.airtableBase, airtableContacts, campaign);

            // need to update "updateContacts method to receive 'fields' argument"
        } else {
            const prospect = await Airtable.getContacts(baseID, recordID);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ prospect: "test" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
