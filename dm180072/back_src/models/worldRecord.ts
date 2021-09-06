import mongoose from "mongoose";

const Schema = mongoose.Schema;

let WorldRecord = new Schema(
    {
        year: {
            type: Number
        },
        place: {
            type: String
        },
        discipline: {
            type: String
        },
        competitor: {
            type: String
        },
        nationality: {
            type: String
        },
        result: {
            type: String
        },
        gender: {
            type: String
        }
    }
);

export default mongoose.model("WorldRecord", WorldRecord, "worldRecords");
