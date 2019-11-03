"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ParkingSpot {
    constructor(spot, level, active, vehicleSize) {
        this.vehicle = null;
        this.spotNumber = spot;
        this.level = level;
        this.active = active;
        this.vehicleSize = vehicleSize;
    }
    toggleSpot(status) {
        try {
            this.active = status;
            return true;
        }
        catch (err) {
            return false;
        }
    }
    getSpot() {
        return this.spotNumber;
    }
    removeVehicle() {
        try {
            this.vehicle = null;
            return false;
        }
        catch (err) {
            return false;
        }
    }
    setVehicle(v) {
        try {
            this.vehicle = v;
            return true;
        }
        catch (err) {
            return false;
        }
    }
    getVehicleDetails() {
        return this.vehicle;
    }
    status() {
        return this.active;
    }
    setTicket(ticket) {
        this.ticket = ticket;
    }
    getTicket() {
        return this.ticket;
    }
}
exports.default = ParkingSpot;
