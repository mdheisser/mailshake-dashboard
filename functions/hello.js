exports.handler = async (event) => {
    if (event.httpMethod === "GET") {
        console.log(event);
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: event }),
        };
    } else if (event.httpMethod === "POST") {
        console.log(event);
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: event }),
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
