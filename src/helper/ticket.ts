import Payment from './payment';
import { PaymentMode } from '../config';
import Vehicle from './vehicle';

export default class Ticket {
    private ticketNum: Number;
    private payment: Payment;
    private issuesAt: Number;
    private isClosed: boolean = false;
    private parkingSpot: Number;
    private vehicle: Vehicle;
    constructor(ticketNum: Number, paymentMode: PaymentMode, amount: Number, paymentDate: Number, spot: Number, vehicle: Vehicle) {
        this.ticketNum = ticketNum;
        this.payment = new Payment(paymentMode, new Date().getTime().toString(), amount, new Date().getTime())
        this.issuesAt = paymentDate;
        this.parkingSpot = spot;
        this.vehicle = vehicle;
    }

    public setTicketStatus(status: boolean): void {
        this.isClosed = status;
    }
}