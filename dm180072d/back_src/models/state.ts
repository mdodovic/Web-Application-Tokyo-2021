import mongoose from "mongoose";

const Schema = mongoose.Schema;

let State = new Schema(
    {
        countryName: {
            type: String
        },
        flag: {
            type: String
        },
        bronseMedals: {
            type: Number
        },
        silverMedals: {
            type: Number
        },
        goldMedals: {
            type: Number
        }
    }
);

export default mongoose.model("State", State, "states");
