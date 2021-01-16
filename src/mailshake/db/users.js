require("dotenv").config();

module.exports = [
    { client: "Summa Media", api: process.env.REACT_APP_SUMMA_MEDIA },
    { client: "Just Roofs And Gutters", api: process.env.REACT_APP_JUST_ROOFS_AND_GUTTERS },
    { client: "Truox", api: process.env.REACT_APP_TRUOX },
    { client: "Integrity", api: process.env.REACT_APP_INTEGRITY },
    { client: "Farha", api: process.env.REACT_APP_FARHA },
    { client: "Rooftek", api: process.env.REACT_APP_ROOFTEK },
    { client: "Custom Installations", api: process.env.REACT_APP_CUSTOM_INSTALLATIONS },
];
