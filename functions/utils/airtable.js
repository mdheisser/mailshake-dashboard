require("dotenv").config();

const Airtable = require("airtable");
const moment = require("moment");

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base("appPfAkOluijuGY1T");
const clientTable = base("TX & OK Verified");
const campaignTable = base("Campaigns");

module.exports = {
    async getCampaign() {
        try {
            const [res] = await campaignTable
                .select({ maxRecords: 1, view: "Grid view" })
                .firstPage();

            return {
                id: res.getId(),
                campaign: res.fields.Campaign,
                campaignID: res.fields.campaignID,
            };
        } catch (error) {
            console.log("ERROR GETCAMPAIGN() ---", error);
        }
    },

    async updateCampaign(id) {
        try {
            const today = moment(new Date()).format("MM/DD/YYYY");

            return await campaignTable.update(id, { "Last Upload": today });
        } catch (error) {
            console.log("ERROR UPDATECAMPAIGN() ---", error);
        }
    },

    async getContacts() {
        try {
            const res = await clientTable.select({ maxRecords: 5, view: "Grid view" }).firstPage();

            return res.map((contact) => {
                const fields = contact.fields;

                return {
                    ...fields,
                    id: contact.getId(),
                };
            });
        } catch (error) {
            console.log("ERROR GETCONTACTS() ---", error);
        }
    },

    async updateContacts(contacts, Campaign) {
        try {
            const today = moment(new Date()).format("MM/DD/YYYY");

            for (let contact of contacts) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 500);
                });

                await clientTable.update(contact.id, {
                    "In Mailshake": true,
                    Campaign,
                    "Mailshake Upload Date": today,
                });
            }
        } catch (error) {
            console.log("ERROR UPDATECONTACTS() ---", error);
        }
    },

    airtableToMailshake(contacts) {
        try {
            return contacts.map((contact) => {
                return {
                    emailAddress: contact.email_first,
                    fullName: contact.first_name,
                    fields: {
                        city: contact.city,
                        company: contact.company_name,
                        "First Line": contact["First Line"],
                        job: contact.job_title,
                        "Last Name": contact.last_name,
                        "LinkedIn Page": contact.url,
                    },
                };
            });
        } catch (error) {
            console.log("ERROR AIRTABLETOMAILSHAKE() ---", error);
        }
    },
};
