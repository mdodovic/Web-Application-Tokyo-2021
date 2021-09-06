import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Competition = new Schema(
    {
        sportName: {
            type: String
        },
        disciplineName: {
            type: String
        },
        initiallySingle: {
            type: Boolean
        },
        actAsSingle: {
            type: Boolean
        },
        gender: {
            type: String
        },
        possibleLocations: {
            type: Array
        },
        begin: {
            type: String
        },
        end: {
            type: String
        },
        delegate: {
            type: String
        },
        groupNumber: {
            type: Number
        },
        competitorsNumber: {
            type: Number
        },
        roundsNumber: {
            type: Number
        },
        resultType: {
            type: String
        },
        resultFormat: {
            type: String
        },
        rankPlayers: {
            type: Boolean
        },
        comment: {
            type: String
        },
        participants: {
            type: Array
        },
        finished: {
            type: Boolean
        }
    }
);

export default mongoose.model("Competition", Competition, "competitions");


