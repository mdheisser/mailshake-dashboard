const addToMailshake = require("./utils/addToMailshake");
const emailProgram = require("./utils/emailProgram");

exports.handler = async (event) => {
    if (event.httpMethod === "GET") {
        // return {
        //     statusCode: 200,
        //     body: JSON.stringify({ msg: "POST request only" }),
        // };

        return await emailProgram();
    } else if (event.httpMethod === "POST") {
        return await addToMailshake(event);
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
