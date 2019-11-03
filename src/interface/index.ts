import {PaymentMode} from '../config'
import ParkingSpot from '../helper/parkingSpot';
import Vehicle from '../helper/vehicle';
import Ticket from '../helper/ticket';

export interface IPromtQuest {
    startWith: String;
    startWithShell: String;
}

export interface IPaymentDetails {
    paymentMode: PaymentMode;
    transactionId: String;
    amount: Number;
    paymentDate: Number;
}

interface IVehicleObj {
    [key: string]: Vehicle;
}

interface ITicket {
    [key: number]: Ticket
}

export interface IParkingList {
    spotList: Array<ParkingSpot>;
    vehicleObj: IVehicleObj;
    tickets: ITicket;
}

export interface IReply {
    parkingCreated(i : Number): String;
    extraSlot: String;
    vehicleAlreadyReg(licence: String): String;
    vehicleReg(spot: Number): String;
    noAvailableSpot: String;
    noActiveSpot: String;
    spotNotAssociated: String;
    slotAvailable(slot: number): String;
    slotAlreadyEmpty(slot: number): String;
    printStatus(list: any): String;
    readingFile: String;
    notFound: String;
    available: String;
}