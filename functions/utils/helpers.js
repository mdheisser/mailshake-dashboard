const axios = require("axios");
const { coldPhrase, coldWord, wrongInfo } = require("./keywords");

module.exports = {
    async minutesWait(minutes) {
        return await new Promise((resolve) => {
            setTimeout(resolve, 60000 * minutes);
        });
    },

    liveCampaigns(campaigns) {
        return campaigns.filter((campaign) => {
            if (
                "Campaign Status" in campaign &&
                "Base ID" in campaign &&
                "API Token" in campaign &&
                "Campaign ID" in campaign
            ) {
                if (campaign["Campaign Status"] === "Live") {
                    return campaign;
                }
            }
        });
    },

    campaignsToRun(campaigns) {
        let textCampaigns = [];

        campaigns.forEach((campaign) => {
            // check if client is in textCampaigns
            const isClientPresent = textCampaigns.some(
                (newCampaign) => newCampaign.Client === campaign.Client
            );

            if ("Type" in campaign && campaign.Type === "Specific") {
                return textCampaigns.push(campaign);
            }

            // check if multiple same clients exist in campaigns
            const clientCampaigns = campaigns.filter((obj) => {
                if (!("Type" in obj)) {
                    return obj.Client === campaign.Client;
                }
            });

            if (clientCampaigns.length > 1 && !isClientPresent) {
                let clientAdded = false;

                clientCampaigns.some((obj) => {
                    if (!("Last Updated" in obj)) {
                        clientAdded = true;
                        return textCampaigns.push(obj);
                    }
                });

                const [nextCampaign] = clientCampaigns.sort(
                    (a, b) => new Date(a["Last Updated"]) - new Date(b["Last Updated"])
                );

                !clientAdded && textCampaigns.push(nextCampaign);
            }

            if (clientCampaigns.length === 1) {
                textCampaigns.push(campaign);
            }
        });

        return textCampaigns;
    },

    mapContact(contacts) {
        return contacts.map((contact) => {
            return {
                emailAddress: contact.email_first || contact.Email,
                fullName: contact.first_name || contact["First Name"],
                fields: {
                    city: contact.city || contact.City || "",
                    company:
                        contact.company_name || contact["Company Name"] || contact.Company || "",
                    "First Line": contact["First Line"] || contact["FIRST LINE"] || "",
                    job: contact.job_title || contact.Job || "",
                    "First Name": contact.first_name || contact["First Name"],
                    "Last Name": contact.last_name || contact["Last Name"],
                    "LinkedIn Page": contact.url || contact["LinkedIn Page"] || "",
                    recordID: contact.recordID,
                },
            };
        });
    },

    responseStatus(response) {
        for (let phrase of coldWord) {
            if (response.toLowerCase() === phrase.toLowerCase()) {
                return "Cold";
            }
        }
        let coldRe = new RegExp(coldPhrase, "i");
        if (coldRe.test(response)) {
            return "Cold";
        }

        let wrongRe = new RegExp(wrongInfo, "i");
        if (wrongRe.test(response)) {
            return "Wrong Info";
        }

        return null;
    },
    async slackNotification(channel, text, location) {
        // notify me about this in Slack
        // await axios.post(channel, { text });
        await axios.post(channel, {
            text,
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text,
                    },
                    accessory: {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: "Reply",
                            emoji: true,
                        },
                        value: "click_me_123",
                        url: `https://app.gohighlevel.com/location/${location}/conversations`,
                        action_id: "button-action",
                    },
                },
            ],
        });
    },

    async getMessages(client, from, to) {
        return await client.messages.list({
            from,
            to,
            limit: 20,
        });
    },

    async getConversation(client, from, to) {
        try {
            const clientConvo = getMessages(client, from, to);
            const prospectConvo = getMessages(client, to, from);
            const [clientMessages, prospectMessages] = await Promise.all([
                clientConvo,
                prospectConvo,
            ]);

            const conversation = [...clientMessages, ...prospectMessages];

            if (conversation.length) {
                // sort by dateSent
                return conversation.sort((a, b) => a.dateSent - b.dateSent);
            }

            return false;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
};
