require("dotenv").config();

const { GoogleSpreadsheet } = require("google-spreadsheet");

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet("1MEBQVT1gt03KqPDZlvHkWdsca6t1ycD6ne-Odmfnze0");

module.exports = {
    async appendProspect() {
        try {
            // Initialize Auth
            await doc.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY,
            });

            await doc.loadInfo(); // loads document properties and worksheets

            const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

            // append rows
            const appendRow = await sheet.addRow(["1", "2", "3", "4", "5", "6"]);

            return appendRow._rawData;
        } catch (error) {
            console.log("ERROR APPENDPROSPECT ---", error);
        }
    },
};
