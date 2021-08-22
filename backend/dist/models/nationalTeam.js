"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let NationalTeam = new Schema({
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
});
exports.default = mongoose_1.default.model("NationalTeam", NationalTeam, "nationalTeams");
//# sourceMappingURL=nationalTeam.js.map