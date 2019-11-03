import Vehicle, { VehicleSize } from './vehicle';
import { ParkingLevel } from '../config';

export default class ParkingSpot {
    private vehicle: Vehicle = null;
    private vehicleSize: VehicleSize;
    private spotNumber: Number;
    private level: ParkingLevel;
    private active: boolean;
    private ticket: number;

    constructor(spot: Number, level: ParkingLevel, active: boolean, vehicleSize: VehicleSize) {
        this.spotNumber = spot;
        this.level = level;
        this.active = active;
        this.vehicleSize = vehicleSize;
    }

    public toggleSpot(status: boolean) : boolean {
        try{
            this.active = status;
            return true
        }
        catch(err) {
            return false;
        }
    }

    public getSpot(): Number {
        return this.spotNumber;
    }

    public removeVehicle() : boolean {
        try{
            this.vehicle = null;
            return false;
        }
        catch(err){
            return false;
        }
    }

    public setVehicle(v: any) : boolean {
        try{
            this.vehicle = v;
            return true;
        }
        catch(err){
            return false;
        }
    }

    public getVehicleDetails() :Vehicle {
        return this.vehicle;
    }

    public status(): boolean {
        return this.active;
    }

    public setTicket(ticket: number): void {
        this.ticket = ticket;
    }

    public getTicket(): number {
        return this.ticket;
    }
}

