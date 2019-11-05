"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vehicle = /** @class */ (function () {
    function Vehicle(license, size, color, spot) {
        this.license = license;
        this.size = size;
        this.color = color.toLowerCase();
        this.spot = spot;
    }
    Vehicle.prototype.getColor = function () {
        return this.color;
    };
    Vehicle.prototype.getParkingSpot = function () {
        return this.spot;
    };
    Vehicle.prototype.setParkingSpot = function (spot) {
        this.spot = spot;
    };
    Vehicle.prototype.getLicense = function () {
        return this.license;
    };
    return Vehicle;
}());
exports.default = Vehicle;
var VehicleSize;
(function (VehicleSize) {
    VehicleSize[VehicleSize["Motorcycle"] = 0] = "Motorcycle";
    VehicleSize[VehicleSize["Car"] = 1] = "Car";
    VehicleSize[VehicleSize["Heavy"] = 2] = "Heavy";
    VehicleSize[VehicleSize["Large"] = 3] = "Large";
})(VehicleSize = exports.VehicleSize || (exports.VehicleSize = {}));
