import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Player = new Schema(
    {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        gender: {
            type: String
        },
        sportName: {
            type: String
        },
        nationality: {
            type: String
        },
        disciplines: {
            type: Array
        }
    }
);

export default mongoose.model("Player", Player, "players");

