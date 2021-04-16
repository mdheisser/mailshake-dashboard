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

    async getCampaigns(view) {
        try {
            const base = await this.assignAirtable("appGB7S9Wknu6MiQb");

            const res = await base("Campaigns").select({ view }).firstPage();

            const campaigns = res.map((campaign) => {
                return {
                    ...campaign.fields,
                    recordID: campaign.getId(),
                };
            });

            return campaigns;
        } catch (error) {
            console.log("ERROR GETCAMPAIGNS() ---", error);
        }
    }

    async updateCampaign(recordID, updatedFields) {
        try {
            const base = await this.assignAirtable("appGB7S9Wknu6MiQb");

            await base("Campaigns").update(recordID, updatedFields);
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

    async getContacts(baseID, view) {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base("First Line Ready")
                .select({
                    maxRecords: 10,
                    filterByFormula: "({Mailshake Ready} = 1)",
                    view,
                })
                .firstPage();

            const contacts = res.map((contact) => ({
                ...contact.fields,
                recordID: contact.getId(),
            }));

            return contacts.length > 0 ? contacts : false;
        } catch (error) {
            console.log("ERROR GETCONTACTS() ---", error);
        }
    }

    async findTextContact(baseID, fullName) {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base("First Line Ready")
                .select({
                    maxRecords: 10,
                    filterByFormula: `AND(({Full Name} = "${fullName}"),({Outreach} = "Text"))`,
                })
                .firstPage();

            const contacts = res.map((contact) => ({
                ...contact.fields,
                recordID: contact.getId(),
            }));

            return contacts.length > 0 ? contacts[0].recordID : false;
        } catch (error) {
            console.log("ERROR FINDTEXTCONTACTS() ---", error);
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
