exports.handler = async (event) => {
    if (event.httpMethod === "GET") {
        const res = JSON.parse(event.body);
        console.log(res);
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: res }),
        };
    } else if (event.httpMethod === "POST") {
        const res = JSON.parse(event.body);
        console.log("res -", res);
        console.log("event -", event);

        const client = JSON.parse(event.body.queryStringParameters.client);
        console.log("client =", client);
        return {
            statusCode: 200,
            body: JSON.stringify({ msg: res }),
        };
    } else {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
