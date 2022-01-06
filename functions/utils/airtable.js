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

    async getCampaign(campaign) {
        try {
            const base = await this.assignAirtable("appGB7S9Wknu6MiQb");

            const [account] = await base("Campaigns")
                .select({
                    maxRecords: 1,
                    filterByFormula: `({Campaign ID} = "${campaign}")`,
                })
                .firstPage();

            return account.fields;
        } catch (error) {
            console.log("ERROR GETCAMPAIGN() ---", error);
            return false;
        }
    }

    async getClient(client) {
        try {
            const base = await this.assignAirtable("appGB7S9Wknu6MiQb");

            let clients = await base("Campaigns")
                .select({
                    maxRecords: 10,
                    filterByFormula: `({Client} = "${client}")`,
                })
                .firstPage();

            if (clients.length) {
                [clients] = clients.map((account) => account.fields);
                return clients;
            } else {
                return false;
            }

            return clients.length ? clients.map((account) => account.fields) : false;
        } catch (error) {
            console.log("ERROR GETCLIENT() ---", error);
            return false;
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

    async getLocation(locationID) {
        try {
            const base = await this.assignAirtable("appGB7S9Wknu6MiQb");

            const [client] = await base("Campaigns")
                .select({
                    maxRecords: 1,
                    filterByFormula: `({Location ID} = "${locationID}")`,
                })
                .firstPage();

            return client.fields;
        } catch (error) {
            console.log("getLocation() ---", error);
            return false;
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

    async createContact(baseID, contact) {
        try {
            const base = await this.assignAirtable(baseID);

            const newContact = await base("Prospects").create(contact);

            return {
                ...newContact.fields,
                recordID: newContact.getId(),
            };
        } catch (error) {
            console.log("ERROR CREATECONTACT() ---", error);
            return false;
        }
    }

    async getContact(baseID, recordID) {
        try {
            const base = await this.assignAirtable(baseID);

            return await (
                await base("Prospects").find(recordID)
            ).fields;
        } catch (error) {
            console.log("ERROR GETCONTACTS() ---", error);
        }
    }

    async getContacts(baseID, view) {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base("Prospects")
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

    async findTextContactByID(baseID, id) {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base("Prospects")
                .select({
                    maxRecords: 10,
                    filterByFormula: `AND(({id} = "${id}"),({Responded} = 0))`,
                })
                .firstPage();

            const contacts = res.map((contact) => ({
                ...contact.fields,
                recordID: contact.getId(),
            }));

            return contacts.length > 0 ? contacts[0] : false;
        } catch (error) {
            console.log("ERROR FINDTEXTCONTACTBYID() ---", error);
            false;
        }
    }

    async findTextContact(baseID, fullName, campaign) {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base("Prospects")
                .select({
                    maxRecords: 10,
                    filterByFormula: `AND(({Full Name} = "${fullName}"),({Outreach} = "Text"),({Campaign} = "${campaign}"),({Responded} = 0))`,
                })
                .firstPage();

            const contacts = res.map((contact) => ({
                ...contact.fields,
                recordID: contact.getId(),
            }));

            return contacts.length > 0 ? contacts[0] : false;
        } catch (error) {
            console.log("ERROR FINDTEXTCONTACT() ---", error);
            false;
        }
    }

    async findSkyleadContact(baseID, fullName) {
        try {
            const base = await this.assignAirtable(baseID);

            const res = await base("Prospects")
                .select({
                    maxRecords: 10,
                    filterByFormula: `AND(({Full Name} = "${fullName}"),({Outreach} = "Skylead"))`,
                })
                .firstPage();

            const contacts = res.map((contact) => ({
                ...contact.fields,
                recordID: contact.getId(),
            }));

            return contacts.length > 0 ? contacts[0] : false;
        } catch (error) {
            console.log("ERROR FINDSKYLEADCONTACT() ---", error);
            return false;
        }
    }

    async updateContact(baseID, recordID, updatedFields) {
        try {
            const base = await this.assignAirtable(baseID);

            await base("Prospects").update(recordID, updatedFields);
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
