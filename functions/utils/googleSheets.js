require("dotenv").config();

const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = class GoogleSpreadsheetApi {
    constructor(doc) {
        if (!doc) {
            throw new Error("Using GoogleSheets requires a docs ID.");
        }

        this.doc = doc;
    }

    assignDoc() {
        try {
            return new GoogleSpreadsheet(this.doc);
        } catch (error) {
            console.log("ERROR ASSIGNDOC ---", error);
        }
    }

    // add contact
    async appendProspect(data) {
        try {
            const doc = await this.assignDoc(this.doc);

            // Initialize Auth
            await doc.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                // private_key: `-----BEGIN PRIVATE KEY-----\n${process.env.GOOGLE_PRIVATE_KEY_2}\n-----END PRIVATE KEY-----\n`,
            });

            await doc.loadInfo(); // loads document properties and worksheets

            const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

            // append rows
            const prospect = await sheet.addRow(data);

            return prospect._rawData;
        } catch (error) {
            console.log("ERROR APPENDPROSPECT ---", error);
        }
    }
};
