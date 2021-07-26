require("dotenv").config();
const axios = require("axios");

exports.handler = async (event) => {
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "POST request only" }),
        };
    } else if (event.httpMethod === "POST") {
        const res = JSON.parse(event.body);
        console.log(`\n${JSON.stringify(res)}\n`);

        await axios.post(process.env.SLACK_EMAIL_NOTIFICATIONS, {
            text: "\n*Client:* Greenscape\n*Campaign:* Revive Lost Leads\n*Response:* Coming soon...\n",
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "POST request only" }),
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
