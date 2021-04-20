const coldWord = ["No", "Stop"];
const coldPhrase = ["Wrong number", "Remove me"];
// const warmResponse = ["Yes", "Sure"];
// const hotResponse = ["Call me"];

module.exports = {
    coldWord: ["No", "Stop", "Unsubscribe"].join("|"),
    coldPhrase: ["Remove me"].join("|"),
    coldExact: ["Not interested", "No thanks", "Opt out", "Wrong Number"],
};
