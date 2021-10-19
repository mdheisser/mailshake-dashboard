const AirtableApi = require("./airtable");
const Airtable = new AirtableApi(process.env.AIRTABLE_API_KEY);

const res = {
    businessEmail: "name@company.com",
    messageType: "Linkedin Message",
    picture:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Elon_Musk_-_The_Summit_2013.jpg/320px-Elon_Musk_-_The_Summit_2013.jpg",
    twitter: "elonmusk",
    website: "https://linkedin.com",
    occupation: "Entrepreneur",
    fullName: "Elon Musk",
    email: "kristian@linkedin.com",
    publicIdentifier: "tesla-motors",
    country: "United States of America",
    currentCompany: "Tesla",
    phone: "+1-202-555-0189",
    yearsInCurrentCompany: 3,
    totalCareerPositionsCount: 10,
    totalYearsInCareer: 20,
    collegeName: "University of Pennsylvania",
    status: "Replied",
    message: "Test message",
    threadId: "https://www.linkedin.com/messaging/thread/6520941171152285697",
    messageCreatedAt: "2019-12-09 18:13:59",
    firstName: "Elon",
    lastName: "Musk",
    lastStepExecution: "2019-12-09 18:13:59",
    linkedinProfile: "https://www.linkedin.com/in/elonmusk",
    uniqueLeadId: 123456,
    campaignName: "Test campaign name",
};

module.exports = async (event) => {
    try {
        const res = JSON.parse(event.body);

        // get accounts from airtable leadgen
        const accounts = await Airtable.getCampaigns("Text");

        // create contact in clients base
        // notify slack
        // remove zaps

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
