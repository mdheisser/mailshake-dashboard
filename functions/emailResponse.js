require("dotenv").config();
const axios = require("axios");

exports.handler = async (event) => {
    if (event.httpMethod === "GET") {
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: "POST request only" }),
        };
    } else if (event.httpMethod === "POST") {
        console.log("event -", event);
        // console.log("event -", event);
        // const res = JSON.parse(event.body);

        // console.log(res);

        return {
            statusCode: 200,
            body: JSON.stringify({ res: "TEST" }),
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
