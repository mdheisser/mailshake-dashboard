const { appendProspect } = require("./googleSheets");

module.exports = async (event) => {
    try {
        const res = JSON.parse(event.body);

        const prospect = await appendProspect(res.client);

        return {
            statusCode: 200,
            body: JSON.stringify({ prospect }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
