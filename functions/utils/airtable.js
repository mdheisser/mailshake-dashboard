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

    async getCampaign(baseID, view = "Alternate") {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base("Campaigns")
                .select({ maxRecords: view === "Alternate" ? 1 : 5, view })
                .firstPage();

            return res.map((record) => ({
                recordID: record.getId(),
                name: record.fields.Campaign,
                id: record.fields.campaignID,
                tag: record.fields.Tag || "",
            }));
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

    async getContact(baseID, recordID) {
        try {
            const base = await this.assignAirtable(baseID);

            return await (await base("First Line Ready").find(recordID)).fields;
        } catch (error) {
            console.log("ERROR GETCONTACTS() ---", error);
        }
    }

    async getContacts(baseID, baseName = "First Line Ready") {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base(baseName)
                .select({ maxRecords: 5, view: "First Lines" })
                .firstPage();

            const contacts = res.map((contact) => {
                if ("Mailshake Ready" in contact.fields) {
                    return {
                        ...contact.fields,
                        recordID: contact.getId(),
                    };
                }
            });

            if (contacts[0] === undefined) {
                return [];
            }

            return contacts;
        } catch (error) {
            console.log("ERROR GETCONTACTS() ---", error);
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
                        city: contact.city || contact.City || "",
                        company:
                            contact.company_name ||
                            contact["Company Name"] ||
                            contact.Company ||
                            "",
                        "First Line": contact["First Line"] || contact["FIRST LINE"] || "",
                        job: contact.job_title || contact.Job || "",
                        "First Name": contact.first_name || contact["First Name"],
                        "Last Name": contact.last_name || contact["Last Name"],
                        "LinkedIn Page": contact.url || contact["LinkedIn Page"] || "",
                        recordID: contact.recordID,
                    },
                };
            });
        } catch (error) {
            console.log("ERROR AIRTABLETOMAILSHAKE() ---", error);
        }
    }
};
