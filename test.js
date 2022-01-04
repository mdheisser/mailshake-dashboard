require("dotenv").config();

const axios = require("axios");
const moment = require("moment");

(async () => {
    try {
        let url =
            "https://sloties.mypinata.cloud/ipfs/QmVJHsqMVUhZz7hiLZs5JdaxgBC4zeAmn1ce3JLkJw5NdA";

        // let { data } = await axios.get(`${url}1`);

        for (let i = 850; i < 10000; i++) {
            let { data } = await axios.get(`${url}/${i}`);

            console.log(data.attributes[2], i);
        }
    } catch (error) {
        // console.log(error);
    }
})();
