const GoogleSpreadsheetApi = require("./utils/googleSheets");

exports.handler = async (event) => {
    try {
        const GoogleSpreadsheet = new GoogleSpreadsheetApi(
            "18HJ7UdA6BC4J89EQLinI9rsWfxO2EEzeF5hn3xXcct8"
        );
        await GoogleSpreadsheet.appendProspect(["Ryan Roman"]);

        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "Success!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error }),
        };
    }
};
