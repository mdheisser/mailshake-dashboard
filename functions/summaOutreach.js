const getProspects = require("./utils/getProspects");
const uploadPhantombuster = require("./utils/uploadPhantombuster");

exports.handler = async (event) => {
    if (event.httpMethod === "GET") {
        return await getProspects(event);
    } else if (event.httpMethod === "POST") {
        return await uploadPhantombuster(event);
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
