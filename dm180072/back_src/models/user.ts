import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        },
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        nationality: {
            type: String
        },
        email: {
            type: String
        },
        type: {
            type: String
        },
        accepted: {
            type: Number
        },
    }
);

export default mongoose.model("User", User, "users");



