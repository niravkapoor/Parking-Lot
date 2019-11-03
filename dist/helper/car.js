"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vehicle_1 = __importDefault(require("./vehicle"));
class Car extends vehicle_1.default {
    constructor(license, size, color, spot) {
        super(license, size, color, spot);
    }
}
exports.Car = Car;
