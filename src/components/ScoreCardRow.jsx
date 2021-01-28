import React from "react";
import ScoreCard from "./ScoreCard";

import { withStyles } from "@material-ui/styles";
import styles from "./styles/ScoreCardRow";

function ScoreCardRow({ mailshakeTotals, isFetching, classes }) {
    const totals = mailshakeTotals.map((total) => (
        <ScoreCard
            key={total.title}
            score={total.score}
            title={total.title}
            percent={total.percent}
            isFetching={isFetching}
        />
    ));

    return <div className={classes.row}>{totals}</div>;
}

export default withStyles(styles)(ScoreCardRow);
