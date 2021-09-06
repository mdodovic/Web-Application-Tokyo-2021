import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Round = new Schema(
    {
        sportName: {
            type: String
        },
        disciplineName: {
            type: String
        },
        gender: {
            type: String
        },
        roundNumber: {
            type: Number
        },
        roundResults: {
            type: Array
        },
        roundType: {
            type: String
        },
        forPosition: {
            type: Number
        }
    }
);

export default mongoose.model("Round", Round, "rounds");

