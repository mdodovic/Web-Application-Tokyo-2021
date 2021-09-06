"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Competition = new Schema({
    sportName: {
        type: String
    },
    disciplineName: {
        type: String
    },
    initiallySingle: {
        type: Boolean
    },
    actAsSingle: {
        type: Boolean
    },
    gender: {
        type: String
    },
    possibleLocations: {
        type: Array
    },
    begin: {
        type: String
    },
    end: {
        type: String
    },
    delegate: {
        type: String
    },
    groupNumber: {
        type: Number
    },
    competitorsNumber: {
        type: Number
    },
    roundsNumber: {
        type: Number
    },
    resultType: {
        type: String
    },
    resultFormat: {
        type: String
    },
    rankPlayers: {
        type: Boolean
    },
    comment: {
        type: String
    },
    participants: {
        type: Array
    }
});
exports.default = mongoose_1.default.model("Competition", Competition, "competitions");
//# sourceMappingURL=competition.js.map