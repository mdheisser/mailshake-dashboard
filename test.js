require("dotenv").config();

const axios = require("axios");
const moment = require("moment");

<<<<<<< HEAD
(async () => {
    try {
        let url =
            "https://sloties.mypinata.cloud/ipfs/QmVJHsqMVUhZz7hiLZs5JdaxgBC4zeAmn1ce3JLkJw5NdA";
=======
const fetch = require("node-fetch");

const users = require("./src/db/users");

const { responseStatus } = require("./functions/utils/helpers");

const MailShakeApi = require("./functions/utils/mailshake");
const AirtableApi = require("./functions/utils/airtable");
>>>>>>> c65ca233a6d63abb9e72c5becc27f52d65f1c845

        // let { data } = await axios.get(`${url}1`);

<<<<<<< HEAD
        for (let i = 850; i < 10000; i++) {
            let { data } = await axios.get(`${url}/${i}`);

            console.log(data.attributes[2], i);
        }
    } catch (error) {
        // console.log(error);
    }
})();
=======
// const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

const response = "stop";

const status = responseStatus(response);

console.log(status);

// (async () => {
//     try {
//         // TODO: get baseID from 'from' email
//         // TODO:
//     } catch (error) {
//         console.log(error);
//     }
// })();
>>>>>>> c65ca233a6d63abb9e72c5becc27f52d65f1c845
