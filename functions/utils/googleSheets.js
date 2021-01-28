require("dotenv").config();

const { GoogleSpreadsheet } = require("google-spreadsheet");

// Initialize the sheet - doc ID is the long id in the sheets URL
const doc = new GoogleSpreadsheet("1PluaeGSR51jXdVFb0AuzQDYJ9DvcryptJlKuIMtYvdM");

module.exports = {
    async appendProspect(data) {
        try {
            // Initialize Auth
            await doc.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY,
            });

            await doc.loadInfo(); // loads document properties and worksheets

            const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

            // append rows
            const prospect = await sheet.addRow(data);

            return prospect._rawData;
        } catch (error) {
            console.log("ERROR APPENDPROSPECT ---", error);
        }
    },
};
