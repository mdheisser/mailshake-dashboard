require("dotenv").config();

const MailShakeApi = require("./mailshake");
const AirtableApi = require("./airtable");
const GoogleSpreadsheetApi = require("./googleSheets");

const users = require("../../src/db/users");

const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

module.exports = async (event) => {
    try {
        const res = JSON.parse(event.body);
        const { recordID, campaignID, email, client } = res;

        const foundUser = users.find((user) => user.client === client);

        const Mailshake = new MailShakeApi(foundUser.mailshakeApi);
        const listOfReplies = await Mailshake.getEmailAction(campaignID, "replied");
        const emailsReplied = listOfReplies.map((reply) => reply.emailAddress);

        if (emailsReplied.includes(email)) {
            await Airtable.updateContact(foundUser.airtableBase, recordID, { Responded: true });
        } else {
            const prospect = await Airtable.getContact(foundUser.airtableBase, recordID);

            const firstName = prospect.first_name || prospect["First Name"];
            const lastName = prospect.last_name || prospect["Last Name"];
            const company = prospect.company_name || prospect["Company Name"];

            const GoogleSpreadsheet = new GoogleSpreadsheetApi(foundUser.googleSheetId);
            const data = await GoogleSpreadsheet.appendProspect([
                `${firstName} ${lastName} ${company}`,
            ]);

            if (data.length > 0) {
                await Airtable.updateContact(foundUser.airtableBase, recordID, {
                    "In Google Sheets": true,
                });
            }
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
