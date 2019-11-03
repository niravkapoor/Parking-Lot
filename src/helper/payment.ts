import { PaymentMode } from '../config';
import { IPaymentDetails } from '../interface';

export default class Payment {
    private paymentDetails: IPaymentDetails;

    constructor(paymentMode: PaymentMode, transactionId: String, amount: Number, paymentDate: Number) {
        this.paymentDetails = new PaymentDetails(paymentMode, transactionId, amount, paymentDate);
    }
}

class PaymentDetails implements IPaymentDetails {
    paymentMode: PaymentMode;
    transactionId: String;
    amount: Number;
    paymentDate: Number;

    constructor(paymentMode: PaymentMode, transactionId: String, amount: Number, paymentDate: Number) {
        this.paymentMode = paymentMode;
        this.transactionId = transactionId;
        this.amount = amount;
        this.paymentDate = paymentDate;
    }

    public getDetails(): IPaymentDetails {
        return {paymentMode: this.paymentMode, transactionId: this.transactionId, amount: this.amount, paymentDate: this.paymentDate}
    }

    public getTransactionId(): String {
        return this.transactionId;
    }


}