import ParkingSpot from './parkingSpot'

export default abstract class Vehicle {
    protected license: String;
    protected size: VehicleSize;
    protected spot: ParkingSpot;
    protected color: String;
    constructor(license: String, size: VehicleSize, color: String, spot: ParkingSpot){
        this.license = license;
        this.size = size;
        this.color = color.toLowerCase();
        this.spot = spot
    }
    public getColor(): String {
        return this.color;
    }
    public getParkingSpot(): ParkingSpot {
        return this.spot;
    }
    public setParkingSpot(spot: ParkingSpot): void{
        this.spot = spot;
    }
    public getLicense(): String {
        return this.license;
    }
    
}

export enum VehicleSize { Motorcycle, Car, Heavy, Large } 

