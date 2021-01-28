import React, { useState } from "react";

import InputField from "./InputField";
import ScoreCardRow from "./ScoreCardRow";
import MenuItem from "@material-ui/core/MenuItem";

import clients from "../db/users";

import { withStyles } from "@material-ui/styles";
import styles from "./styles/Dashboard";
import users from "../db/users";

import axios from "axios";

function Dashboard(props) {
    const { classes } = props;

    const scoreTotals = [
        { title: "Recipients", score: 0, percent: "0%" },
        { title: "Sent", score: 0, percent: "0%" },
        { title: "Opened", score: 0, percent: "0%" },
        { title: "Clicked", score: 0, percent: "0%" },
        { title: "Replied", score: 0, percent: "0%" },
        { title: "Bounced", score: 0, percent: "0%" },
    ];

    const [client, setClient] = useState({ client: "", campaigns: [] });
    const [campaign, setCampaign] = useState({
        client: "",
        campaignID: "",
        totals: scoreTotals,
        isFetching: false,
    });

    const selectClient = async (event) => {
        setClient({
            client: event.target.value,
            campaigns: await getCampaigns(event),
        });
        setCampaign({
            ...campaign,
            client: event.target.value,
        });
    };

    const selectCampaign = async (event) => {
        setCampaign({
            ...campaign,
            isFetching: true,
        });
        const [selectedUser] = users.filter((user) => user.client === client.client);

        const { data } = await axios.post("/.netlify/functions/getCampaignTotals", {
            client: selectedUser.mailshakeApi,
            campaignID: event.target.value,
        });

        setCampaign({
            ...campaign,
            campaignID: event.target.value,
            totals: data.totals,
            isFetching: false,
        });
    };

    const getCampaigns = async (event) => {
        const clientName = event.target.value;

        const [selectedClient] = clients.filter((client) => client.client === clientName);

        const { data } = await axios.post("/.netlify/functions/getCampaigns", {
            client: selectedClient.mailshakeApi,
        });

        return data.campaigns;
    };

    const displayClients = clients.map((client) => (
        <MenuItem key={client.client} value={client.client}>
            {client.client}
        </MenuItem>
    ));

    const displayCampaigns = () => {
        return client.campaigns.map((campaign) => (
            <MenuItem key={campaign.id} value={campaign.id}>
                {campaign.title}
            </MenuItem>
        ));
    };

    return (
        <div className={classes.dashboard}>
            <div style={{ display: "flex", padding: "20px 20px" }}>
                <InputField
                    key="client"
                    label="Client"
                    menuItems={displayClients}
                    handleChange={selectClient}
                    value={client.client}
                    style={{ paddingRight: "20px" }}
                />
                {client.campaigns.length > 0 && (
                    <InputField
                        key="campaign"
                        label="Campaign"
                        menuItems={displayCampaigns()}
                        handleChange={selectCampaign}
                        value={campaign.campaignID}
                    />
                )}
            </div>
            <div>
                {campaign.totals.length > 0 && (
                    <ScoreCardRow
                        mailshakeTotals={campaign.totals}
                        isFetching={campaign.isFetching}
                    />
                )}
            </div>
        </div>
    );
}

export default withStyles(styles)(Dashboard);
