import Vehicle, { VehicleSize } from './vehicle';
import ParkingSpot from './parkingSpot';

export class Car extends Vehicle {
    constructor(license: String, size: VehicleSize, color: String, spot: ParkingSpot) {
        super(license, size , color, spot);
    } 
}