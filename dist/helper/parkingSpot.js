"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParkingSpot = /** @class */ (function () {
    function ParkingSpot(spot, level, active, vehicleSize) {
        this.vehicle = null;
        this.spotNumber = spot;
        this.level = level;
        this.active = active;
        this.vehicleSize = vehicleSize;
    }
    ParkingSpot.prototype.toggleSpot = function (status) {
        try {
            this.active = status;
            return true;
        }
        catch (err) {
            return false;
        }
    };
    ParkingSpot.prototype.getSpot = function () {
        return this.spotNumber;
    };
    ParkingSpot.prototype.removeVehicle = function () {
        try {
            this.vehicle = null;
            return false;
        }
        catch (err) {
            return false;
        }
    };
    ParkingSpot.prototype.setVehicle = function (v) {
        try {
            this.vehicle = v;
            return true;
        }
        catch (err) {
            return false;
        }
    };
    ParkingSpot.prototype.getVehicleDetails = function () {
        return this.vehicle;
    };
    ParkingSpot.prototype.status = function () {
        return this.active;
    };
    ParkingSpot.prototype.setTicket = function (ticket) {
        this.ticket = ticket;
    };
    ParkingSpot.prototype.getTicket = function () {
        return this.ticket;
    };
    return ParkingSpot;
}());
exports.default = ParkingSpot;
