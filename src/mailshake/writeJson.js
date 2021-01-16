const fs = require("fs");

module.exports = async (data, fileName) => {
    await fs.promises.writeFile(`./db/campaigns/${fileName}.json`, JSON.stringify(data));
};
