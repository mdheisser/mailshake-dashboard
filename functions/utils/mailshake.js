const mailshake = require("mailshake-node");

module.exports = class MailShakeApi {
    constructor(apiKey) {
        if (!apiKey) {
            throw new Error("Using Mailshake requires an API key.");
        }

        this.apiKey = apiKey;
    }

    async assignMailshake() {
        try {
            return mailshake(this.apiKey);
        } catch (error) {
            console.log("NO API KEY PROVIDED ---", error);
        }
    }

    async getCampaign(campaignID) {
        try {
            const mailshake = await this.assignMailshake();

            const campaign = await mailshake.campaigns.get({ campaignID });

            return campaign;
        } catch (error) {
            console.log("ERROR RETRIEVING CAMPAIGN ---", error);
        }
    }

    async getRecipients(campaignID) {
        const mailshake = await this.assignMailshake();

        let lastPage = false;
        let recipients = [];

        try {
            let page = await mailshake.recipients.list({ campaignID });

            while (!lastPage) {
                recipients = [...recipients, ...page.results];

                if ("next" in page) {
                    page = await page.next();
                } else {
                    lastPage = true;
                    return recipients;
                }
            }
        } catch (error) {
            console.log("ERROR getReceipients() ---", error);
        }
    }

    async getEmailAction(campaignID, action) {
        let lastPage = false;
        let recipients = [];

        try {
            const mailshake = await this.assignMailshake();

            let page = await mailshake.recipients.list({
                campaignID,
                filter: {
                    action,
                    negateAction: false,
                },
            });

            while (!lastPage) {
                recipients = [...recipients, ...page.results];

                if ("next" in page) {
                    page = await page.next();
                } else {
                    lastPage = true;
                    return recipients;
                }
            }
        } catch (error) {
            console.log(`ERROR RETRIEVING ${action.toUpperCase()} EMAILS ---`, error);
        }
    }

    async getEmailBlast(campaignID, action, campaignMessageID) {
        try {
            const mailshake = await this.assignMailshake();

            const bouncedEmails = await mailshake.recipients.list({
                campaignID,
                filter: {
                    action,
                    campaignMessageID,
                    negateAction: false,
                },
            });

            return bouncedEmails;
        } catch (error) {
            console.log(`ERROR RETRIEVING ${action.toUpperCase()} EMAILS ---`, error);
        }
    }

    async listCampaigns() {
        try {
            const mailshake = await this.assignMailshake();

            const campaigns = await mailshake.campaigns.list();

            return campaigns;
        } catch (error) {
            console.log("ERROR LISTING CAMPAIGNS ---", error);
        }
    }

    async getAllScores(campaignID) {
        try {
            const recipients = await this.getRecipients(campaignID);
            const sent = await this.getEmailAction(campaignID, "wasSent");
            const opened = await this.getEmailAction(campaignID, "opened");
            const clicked = await this.getEmailAction(campaignID, "clicked");
            const replied = await this.getEmailAction(campaignID, "replied");
            const bounced = await this.getEmailAction(campaignID, "bounced");

            const sentRate = Math.round((sent.length / recipients.length) * 100);
            const openedRate = Math.round((opened.length / sent.length) * 100);
            const clickedRate = Math.round((clicked.length / opened.length) * 100);
            const replyRated = Math.round((replied.length / opened.length) * 100);
            const bounceRate = Math.round((bounced.length / opened.length) * 100);

            return [
                { title: "Recipients", score: recipients.length, percent: "100%" },
                {
                    title: "Sent",
                    score: sent.length,
                    percent: `${sentRate}%`,
                },
                {
                    title: "Opened",
                    score: opened.length,
                    percent: `${openedRate}%`,
                },
                {
                    title: "Clicked",
                    score: clicked.length,
                    percent: `${clickedRate}%`,
                },
                {
                    title: "Replied",
                    score: replied.length,
                    percent: `${replyRated}%`,
                },
                {
                    title: "Bounced",
                    score: bounced.length,
                    percent: `${bounceRate}%`,
                },
            ];
        } catch (error) {
            console.log("ERROR GETTING ALL SCORES ---", error);
        }
    }

    async addToCampaign(campaignID, contacts) {
        try {
            const mailshake = await this.assignMailshake();

            return await mailshake.recipients.add({
                campaignID,
                addAsNewList: true,
                addresses: contacts,
            });
        } catch (error) {
            console.log("ERROR ADDTOCAMPAIGN() ---", error);
        }
    }
};
