"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Player = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    gender: {
        type: String
    },
    sportName: {
        type: String
    },
    nationality: {
        type: String
    },
    disciplines: {
        type: Array
    }
});
exports.default = mongoose_1.default.model("Player", Player, "players");
//# sourceMappingURL=player.js.map