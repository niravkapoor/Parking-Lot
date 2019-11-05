"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Payment = /** @class */ (function () {
    function Payment(paymentMode, transactionId, amount, paymentDate) {
        this.paymentDetails = new PaymentDetails(paymentMode, transactionId, amount, paymentDate);
    }
    return Payment;
}());
exports.default = Payment;
var PaymentDetails = /** @class */ (function () {
    function PaymentDetails(paymentMode, transactionId, amount, paymentDate) {
        this.paymentMode = paymentMode;
        this.transactionId = transactionId;
        this.amount = amount;
        this.paymentDate = paymentDate;
    }
    PaymentDetails.prototype.getDetails = function () {
        return { paymentMode: this.paymentMode, transactionId: this.transactionId, amount: this.amount, paymentDate: this.paymentDate };
    };
    PaymentDetails.prototype.getTransactionId = function () {
        return this.transactionId;
    };
    return PaymentDetails;
}());
