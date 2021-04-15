require("dotenv").config();

module.exports = async (event) => {
    try {
        console.log("\n------------------ EVENT START ------------------\n");
        console.log(event);
        console.log("\n------------------ EVENT END ------------------\n");

        console.log("\n------------------ RES START ------------------\n");
        const res = JSON.parse(event.body);
        console.log(res);
        console.log("\n------------------ RES END ------------------\n");

        return {
            statusCode: 200,
            body: JSON.stringify({ res }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: error }),
        };
    }
};
