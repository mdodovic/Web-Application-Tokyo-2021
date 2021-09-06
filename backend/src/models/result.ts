import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Result = new Schema(
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
        final: {
            type: Array
        },
        tree: {
            type: Array
        },
        group: {
            type: Array
        }
    }
);

export default mongoose.model("Result", Result, "results");


