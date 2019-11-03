"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payment {
    constructor(paymentMode, transactionId, amount, paymentDate) {
        this.paymentDetails = new PaymentDetails(paymentMode, transactionId, amount, paymentDate);
    }
}
exports.default = Payment;
class PaymentDetails {
    constructor(paymentMode, transactionId, amount, paymentDate) {
        this.paymentMode = paymentMode;
        this.transactionId = transactionId;
        this.amount = amount;
        this.paymentDate = paymentDate;
    }
    getDetails() {
        return { paymentMode: this.paymentMode, transactionId: this.transactionId, amount: this.amount, paymentDate: this.paymentDate };
    }
    getTransactionId() {
        return this.transactionId;
    }
}
