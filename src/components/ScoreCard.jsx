import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ReactLoading from "react-loading";

import { withStyles } from "@material-ui/styles";
import styles from "./styles/ScoreCard";

function ScoreCard(props) {
    const { classes, score, title, percent, isFetching } = props;

    return (
        <Card className={classes.card}>
            {isFetching ? (
                <ReactLoading type="spinningBubbles" color="#fff" />
            ) : (
                <CardContent>
                    <Typography
                        className={classes.score}
                        component="h1"
                        style={{ textAlign: "center" }}>
                        {score}
                    </Typography>
                    {title !== "Recipients" && (
                        <Typography
                            className={classes.percent}
                            color="textSecondary"
                            style={{ textAlign: "center" }}>
                            {percent}
                        </Typography>
                    )}
                    <Typography
                        className={classes.title}
                        color="textSecondary"
                        style={{ textAlign: "center" }}>
                        {title}
                    </Typography>
                </CardContent>
            )}
        </Card>
    );
}

export default withStyles(styles)(ScoreCard);
