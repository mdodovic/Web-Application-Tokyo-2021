import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Timetable = new Schema(
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
        type: {
            type: String
        },
        location: {
            type: String
        },
        datetime: {
            type: String
        }
    }
);

export default mongoose.model("Timetable", Timetable, "timetables");
