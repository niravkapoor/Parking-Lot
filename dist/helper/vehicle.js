"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Vehicle {
    constructor(license, size, color, spot) {
        this.license = license;
        this.size = size;
        this.color = color.toLowerCase();
        this.spot = spot;
    }
    getColor() {
        return this.color;
    }
    getParkingSpot() {
        return this.spot;
    }
    setParkingSpot(spot) {
        this.spot = spot;
    }
    getLicense() {
        return this.license;
    }
}
exports.default = Vehicle;
var VehicleSize;
(function (VehicleSize) {
    VehicleSize[VehicleSize["Motorcycle"] = 0] = "Motorcycle";
    VehicleSize[VehicleSize["Car"] = 1] = "Car";
    VehicleSize[VehicleSize["Heavy"] = 2] = "Heavy";
    VehicleSize[VehicleSize["Large"] = 3] = "Large";
})(VehicleSize = exports.VehicleSize || (exports.VehicleSize = {}));
