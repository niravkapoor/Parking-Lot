"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const payment_1 = __importDefault(require("./payment"));
class Ticket {
    constructor(ticketNum, paymentMode, amount, paymentDate, spot, vehicle) {
        this.isClosed = false;
        this.ticketNum = ticketNum;
        this.payment = new payment_1.default(paymentMode, new Date().getTime().toString(), amount, new Date().getTime());
        this.issuesAt = paymentDate;
        this.parkingSpot = spot;
        this.vehicle = vehicle;
    }
    setTicketStatus(status) {
        this.isClosed = status;
    }
}
exports.default = Ticket;
