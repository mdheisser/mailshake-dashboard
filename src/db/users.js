require("dotenv").config();

module.exports = [
    {
        client: "Summa Media",
        mailshakeApi: process.env.REACT_APP_SUMMA_MEDIA,
        airtableApi: process.env.AIRTABLE_API_KEY,
        airtableBase: "appPfAkOluijuGY1T",
        googleSheetId: "18HJ7UdA6BC4J89EQLinI9rsWfxO2EEzeF5hn3xXcct8",
    },
    {
        client: "Just Roofs And Gutters",
        mailshakeApi: process.env.REACT_APP_JUST_ROOFS_AND_GUTTERS,
        airtableApi: process.env.AIRTABLE_API_KEY,
        airtableBase: "appEEsvEbsFQR2auL",
        googleSheetId: "123",
    },
    {
        client: "Truox",
        mailshakeApi: process.env.REACT_APP_TRUOX,
        airtableApi: process.env.AIRTABLE_API_KEY,
        airtableBase: "appHyxUS12LyQvWEW",
        googleSheetId: "123",
    },
    {
        client: "Integrity",
        mailshakeApi: process.env.REACT_APP_INTEGRITY,
        airtableApi: process.env.AIRTABLE_API_KEY,
        airtableBase: "appLVlpoe7RYAQfm9",
        googleSheetId: "123",
    },
    {
        client: "Farha",
        mailshakeApi: process.env.REACT_APP_FARHA,
        airtableApi: process.env.AIRTABLE_API_KEY,
        airtableBase: "appAJd8DNpOfsXN53",
        googleSheetId: "123",
    },
    {
        client: "Rooftek",
        mailshakeApi: process.env.REACT_APP_ROOFTEK,
        airtableApi: process.env.AIRTABLE_API_KEY,
        airtableBase: "app115xQzw1jhn5U8",
        googleSheetId: "1a_ngOoI8jB0iL9zN57z-v2PA4ZbhYhS-LZeqRnTDXbw",
    },
    {
        client: "Custom Installations",
        mailshakeApi: process.env.REACT_APP_CUSTOM_INSTALLATIONS,
        airtableApi: process.env.AIRTABLE_API_KEY,
        airtableBase: "appbVNvX9lyC1qjOP",
        googleSheetId: "123",
    },
];
