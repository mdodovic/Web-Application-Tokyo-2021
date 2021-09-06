import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Group = new Schema(
    {
        sportName: {
            type: String
        },
        gender: {
            type: String
        },
        groupNumber: {
            type: Number
        },
        roundNumber: {
            type: Number
        },
        groupMatches: {
            type: Array
        }
    }
);

export default mongoose.model("Group", Group, "groups");


