import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Sport = new Schema(
    {
        name: {
            type: String
        },
        disciplines: {
            type: Array
        }
    }
);

export default mongoose.model("Sport", Sport, "sports");
