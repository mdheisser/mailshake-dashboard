const MailShakeApi = require("./utils/mailshake");
const {
    getCampaign,
    getContacts,
    airtableToMailshake,
    updateCampaign,
    updateContacts,
} = require("./utils/airtable");

exports.handler = async (event) => {
    try {
        const { id, campaign, campaignID } = await getCampaign();
        const airtableContacts = await getContacts();

        const mailshakeContacts = airtableToMailshake(airtableContacts);
        const summa = new MailShakeApi(process.env.REACT_APP_SUMMA_MEDIA);
        await summa.addToCampaign(campaignID, mailshakeContacts);

        await updateCampaign(id);
        await updateContacts(airtableContacts, campaign);

        return {
            statusCode: 200,
            body: JSON.stringify({ campaign }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ msg: "Error" }),
        };
    }
};
