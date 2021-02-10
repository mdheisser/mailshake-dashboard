const Airtable = require("airtable");
const moment = require("moment");

module.exports = class AirtableApi {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("Using Airtable requires an API key.");
        }

        this.apiKey = apiKey;
    }

    async assignAirtable(baseID) {
        try {
            return new Airtable({ apiKey: this.apiKey }).base(baseID);
        } catch (error) {
            console.log("NO API KEY PROVIDED ---", error);
        }
    }

    async getCampaign(baseID) {
        try {
            const base = await this.assignAirtable(baseID);

            const [res] = await base("Campaigns")
                .select({ maxRecords: 1, view: "Grid view" })
                .firstPage();

            return {
                recordID: res.getId(),
                name: res.fields.Campaign,
                id: res.fields.campaignID,
            };
        } catch (error) {
            console.log("ERROR GETCAMPAIGN() ---", error);
        }
    }

    async updateCampaign(baseID, id) {
        try {
            const base = await this.assignAirtable(baseID);

            const today = moment(new Date()).format("MM/DD/YYYY");

            return await base("Campaigns").update(id, { "Last Upload": today });
        } catch (error) {
            console.log("ERROR UPDATECAMPAIGN() ---", error);
        }
    }

    async getContacts(baseID) {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base("First Line Ready")
                .select({ maxRecords: 5, view: "Grid view" })
                .firstPage();

            return res.map((contact) => {
                const fields = contact.fields;

                return {
                    ...fields,
                    recordID: contact.getId(),
                };
            });
        } catch (error) {
            console.log("ERROR GETCONTACTS() ---", error);
        }
    }

    async updateContacts(baseID, contacts, campaign) {
        try {
            const base = await this.assignAirtable(baseID);

            const today = moment(new Date()).format("MM/DD/YYYY");

            for (let contact of contacts) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 500);
                });

                await base("First Line Ready").update(contact.recordID, {
                    "In Mailshake": true,
                    Campaign: campaign.name,
                    campaignID: campaign.id,
                    "Mailshake Upload Date": today,
                });
            }
        } catch (error) {
            console.log("ERROR UPDATECONTACTS() ---", error);
        }
    }

    async updateContact(baseID, recordID, updatedFields) {
        try {
            const base = await this.assignAirtable(baseID);

            await base("First Line Ready").update(recordID, updatedFields);
        } catch (error) {
            console.log("ERROR UPDATECONTACTS() ---", error);
        }
    }

    airtableToMailshake(contacts) {
        try {
            return contacts.map((contact) => {
                return {
                    emailAddress: contact.email_first || contact.Email,
                    fullName: contact.first_name || contact["First Name"],
                    fields: {
                        city: contact.city || "",
                        company: contact.company_name || contact["Company Name"],
                        "First Line": contact["First Line"] || contact["FIRST LINE"] || "",
                        job: contact.job_title || "",
                        "Last Name": contact.last_name || contact["Last Name"],
                        "LinkedIn Page": contact.url || "",
                        recordID: contact.recordID,
                    },
                };
            });
        } catch (error) {
            console.log("ERROR AIRTABLETOMAILSHAKE() ---", error);
        }
    }
};
