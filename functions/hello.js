require("dotenv").config();

exports.handler = async (event) => {
    return {
        statusCode: 200,
        // body: JSON.stringify({ msg: "hello world - 2/12/2020" }),
        body: JSON.stringify({ msg: process.env.GOOGLE_PRIVATE_KEY.split("\\n").join("\n") }),
    };
};
