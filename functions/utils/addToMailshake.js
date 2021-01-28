const MailShakeApi = require("./mailshake");
const {
    getCampaign,
    getContacts,
    airtableToMailshake,
    updateCampaign,
    updateContacts,
} = require("./airtable");

module.exports = async (event) => {
    try {
        // const { id, campaign, campaignID } = await getCampaign();
        // const airtableContacts = await getContacts();

        // const firstLiners = airtableContacts.filter((contact) => contact["First Line"] !== "");

        // if (firstLiners.length > 0) {
        //     const mailshakeContacts = airtableToMailshake(firstLiners);
        //     const summa = new MailShakeApi(process.env.REACT_APP_SUMMA_MEDIA);
        //     await summa.addToCampaign(campaignID, mailshakeContacts);

        //     await updateCampaign(id);
        //     await updateContacts(airtableContacts, campaign);
        // }

        const res = JSON.parse(event.body);

        console.log(res.client);

        return {
            statusCode: 200,
            // body: JSON.stringify({ campaign }),
            body: JSON.stringify({ res }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
