"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Sport = new Schema({
    name: {
        type: String
    },
    disciplines: {
        type: Array
    },
    possibleLocations: {
        type: Array
    }
});
exports.default = mongoose_1.default.model("Sport", Sport, "sports");
//# sourceMappingURL=sport.js.map