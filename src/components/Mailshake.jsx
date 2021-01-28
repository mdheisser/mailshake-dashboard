import React from "react";
import Dashboard from "./Dashboard";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/styles";
import styles from "./styles/MailShake";

function Mailshake({ classes }) {
    return (
        <Paper className={classes.mailshake} elevation={0}>
            <AppBar color="primary" position="static" style={{ height: "64px" }}>
                <Toolbar>
                    <Typography color="inherit">MAILSHAKE DASHBOARD</Typography>
                </Toolbar>
            </AppBar>
            <Grid container justify="center" style={{ marginTop: "4rem" }}>
                <Grid item xs={11} md={8} lg={8}>
                    <Dashboard />
                </Grid>
            </Grid>
        </Paper>
    );
}

export default withStyles(styles)(Mailshake);
