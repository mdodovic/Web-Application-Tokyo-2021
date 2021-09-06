import mongoose from "mongoose";

const Schema = mongoose.Schema;

let NationalTeam = new Schema(
    {
        nationality: {
            type: String
        },
        sportName: {
            type: String
        },
        disciplineName: {
            type: String
        },
        gender: {
            type: String
        },
        single: {
            type: Boolean
        },
        players: {
            type: Array
        },
        accepted: {
            type: Boolean
        }
    }
);

export default mongoose.model("NationalTeam", NationalTeam, "nationalTeams");


