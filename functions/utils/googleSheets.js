require("dotenv").config();

const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = class GoogleSpreadsheetApi {
    constructor(doc) {
        if (!doc) {
            throw new Error("Using GoogleSheets requires a docs ID.");
        }

        this.doc = doc;
    }

    assignDoc() {
        try {
            return new GoogleSpreadsheet(this.doc);
        } catch (error) {
            console.log("ERROR ASSIGNDOC ---", error);
        }
    }

    // add contact
    async appendProspect(data) {
        try {
            const doc = await this.assignDoc(this.doc);

            // Initialize Auth
            await doc.useServiceAccountAuth({
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                // private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
                private_key: `-----BEGIN PRIVATE KEY-----\n${process.env.GOOGLE_PRIVATE_KEY_1}\nN/y0cLC7H05xvrSbCkuCayCUrOSDkI5pfY2qh0c7r0HJtUeoY/ompAuKNWBb27n1\nvyH3j+60B1zct2Rb6a5bcpN5FpJcyMu4tb6QxIRlfAog8eVej4HAUvJiU+o5hB14\nKV02bgjZupdBeoYwaWqjtjKWlJIUPadnX/lJ6GLbMlGLHjYF4IYkbgEVgw+bJDBx\nFLIgBO1kbJdpq3+h9NIYWNaPkWWZ3Szo8RBZ6XEPtXOn51kE6Xruv1NMbFlZ0eR6\nSQX+D6Mx6Buh69I+HvIb5Rt+vkejBfmiJiFoC5LQmoo3WLIGV8CyWp782luueIw7\noMaB88PTAgMBAAECggEALxlJAQLS3BsIyuFfrVznh5TbHURkuE34c/SM2y8u+QZo\n7QgbO7D5IWWWuQuhnWgVfik5f70nUlvbnN5s/TkBQ5WyL5PHC+Z0f1MdlJemjgEM\ng3Eai8ipfqrrkieJE//bPj8SXdzCgrzFycT53xU2PYTaOsfhTpYfloOj6FosYgL6\nHug0JB4CjifoJsS7c+jAg1xYfiA1mc7oobzYcKHj6imQmEs/ZAkvn0xZov3+a4o0\npa0xy814V9Qg9IBEai7jurKJ75BtkGb9U6qBrCTE8fDQb70sEn8T571LtDi1Hna1\ndxuYxi1UjS8wrHEUT2UtAEbfwhv6PNWZWuwBSv5nAQKBgQDHzZSeh3MsDDCRJ6+o\nsM9EwDhct3VrHo44PcQqHYfa9NO9sW39E19Ax1GNJBRHO6LrVHyN0lcslVQUZb4v\nDCkmu371zQmr0iMD2SVjJSgL2ylZRXynR0+UGSaANoqCSO+DmdLf3b6vPpLxfz1J\nmIkVf8CcRC1AS+ivJZ85dL800wKBgQDC2JGFEfOtJgoD2y6A6eJ9WwrH2+jn9NhH\nqbhRAEVbLvvq5KteLePwZS1W1cwEPBpoU5+EuwBXHYp46RBmjLQSHdHQ4XlHE001\n5MABryvFyz+0G8APTZGbCCJB/g4bI6Roefy/xjH9eeFVFWQ0FnxPprZ9LOCjBv+B\nkFq0jBvVAQKBgQCr6qIEPbvFnL91RlaIqYnOOC7G6Dwp7WKl1c+iBULODXbbc32W\nEkMVc+shrHeeSxwFrO53ARNtExgDbP/Vb3tBDndRfBjkNK1YNFFNG713Zh4P6BA3\nxs4cOf+8tjE7pRIhhAvEAAKAuzCohrjvSEY7r27FhowBFM+jVJXKVD/pbQKBgCrw\npWlJIoWXK3/cDuyUHrj3lnGjMjnkSMHKUndvctl8ikIi8O1JecFh2tMXPOX2BO/W\n9gG/YHzSYtDwtA+VlJ2lerbo6dxTEaH97p6wZxopB7n+n53/v0YGTd5zSdKLUVFB\nCQWOfTfaY2Fn3HRqPC0llXQSrtLe2PJJyOOfOQcBAoGBALp9O+sJj0cGBSxFXnuR\ndaGLTujGJwSOHDofhf1umi5Hbf5MZw84lfaBmLutyRh6M8ms4M+B9DAzR/2yGpKB\nLQv5N8RNz3Fwdg3kqqWRs4EBa5ceyTm4XKZUMov0G5D7oP+p6U0/S3OmzGEAAvVu\nd/klcv9fuZy4smk54xB1TmA7\n-----END PRIVATE KEY-----\n`,
            });

            await doc.loadInfo(); // loads document properties and worksheets

            const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

            // append rows
            const prospect = await sheet.addRow(data);

            return prospect._rawData;
        } catch (error) {
            console.log("ERROR APPENDPROSPECT ---", error);
        }
    }
};
