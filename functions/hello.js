require("dotenv").config();

exports.handler = async (event) => {
    console.log("client_email =", process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    console.log("private_key =", process.env.GOOGLE_PRIVATE_KEY);
    console.log("private_key =", process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"));

    return {
        statusCode: 200,
        body: JSON.stringify({ msg: "hello world - 2/12/2020" }),
    };
};
