"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let State = new Schema({
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
});
exports.default = mongoose_1.default.model("State", State, "states");
//# sourceMappingURL=state.js.map