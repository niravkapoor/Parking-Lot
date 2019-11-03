import { QUESTIONS, KEY_WORD, REPLY, APP_CONSTANT } from './constant/prompt';
import * as readline from 'readline';
import { IParkingList } from './interface';
import ParkingSpot from './helper/parkingSpot';
import { ParkingLevel, PaymentMode, Operations } from './config';
import { VehicleSize } from './helper/vehicle';
import { Car } from './helper/car';
import Ticket from './helper/ticket';
import * as fs from 'fs';

class App {
    private static standard_input: any;
    private static parkingList: IParkingList = null;
    private static availableSpot: number;
    private static operationPerformed: Operations = null;
    static init(): void{
        try{
            App.parkingList = { spotList: [undefined], vehicleObj: {}, tickets: {}};
            App.standard_input = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });
            console.log(QUESTIONS.startWith);              
            App.standard_input.on('line', App.start);
        }
        catch(err){
            console.log('Error in init', err)
        }
    }

    static start(data: any): void {
        const inputObj = new Set();
        data.split(" ").forEach((ele) => {
            if(!inputObj.has(ele)){
                inputObj.add(ele);
            }
        })
        try{            
            switch(true){
                case data === "1":
                    App.readFileInput();
                    break;
                case data === "2":
                    if(App.operationPerformed !== Operations.File)
                        console.log(QUESTIONS.startWithShell);
                    break;
                case !!inputObj.has(KEY_WORD.CREATE_PARKING_LOT):
                    App.createParkingLot(data);
                    break;
                case !!inputObj.has(KEY_WORD.PARK):
                    App.parkVehicle(data);
                    break;
                case !!inputObj.has(KEY_WORD.REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR):
                    App.vehicleByColor(data);
                    break;
                case !!inputObj.has(KEY_WORD.SLOT_NUMBERS_FOR_CARS_WITH_COLOUR):
                    App.vehicleSlotByColor(data);
                    break;
                case !!inputObj.has(KEY_WORD.SLOT_NUMBER_FOR_REGISTRATION_NUMBER):
                    App.vehicleByLicence(data);
                    break;
                case !!inputObj.has(KEY_WORD.LEAVE):
                    App.unparkVehicle(data);
                    break;
                case !!inputObj.has(KEY_WORD.STATUS):
                    App.getStatus(data);
                    break;
                default:
                    break;
                
            }
            
        }
        catch(err){
            console.log('Error in start', err);
        }
    }

    static readFileInput(): void {
        try{
            const inputs = [];
            App.operationPerformed = Operations.File;
            console.log(`${REPLY.readingFile}`);
            const readInterface = readline.createInterface({
                input: fs.createReadStream(`${APP_CONSTANT.FILE_PATH}`),
                output: process.stdout,
                terminal: false
            });

            readInterface.on('line', (line) => {
                inputs.push(line);
            });

            readInterface.on('close', () => {
                inputs.forEach((ele) => {
                    App.start(ele);
                })
            })

        }catch(err){
            console.log('Error in readFileInput', err)
        }
    }

    static createParkingLot(data: String): void {
        try{
            const isAlreadyCreatd = App.parkingList.spotList.length;
            const [word, numSpotLoc] = data.split(" ");
            let numSpot = Number(numSpotLoc);

            for(let i = 1; i <= numSpot; i++){
                App.parkingList.spotList.push(
                    new ParkingSpot(i, ParkingLevel.One, true, VehicleSize.Car)
                )
            }

            if(isAlreadyCreatd > 1){
                console.log(APP_CONSTANT.COLORS.FgGreen,`${REPLY.parkingCreated(numSpot)}${REPLY.extraSlot}`); 
            }else{
                
                App.availableSpot = 1;
                console.log(APP_CONSTANT.COLORS.FgGreen,REPLY.parkingCreated(numSpot));
            }
            App.start("2");
        }
        catch(err) {
            console.log('Error in createParkingLot', err)
        }
    }

    static findNextParkingSpot(spot: number): number {
        try{
            for(let i = spot + 1; i < App.parkingList.spotList.length; i++){
                if(!App.parkingList.spotList[i].getVehicleDetails() && App.parkingList.spotList[i].status()){
                    return i;
                }
            }
            return spot;
        }catch(err) {
            console.log('Error in findNextParkingSpot', err)
        }
    }

    static parkVehicle(data: String): void {
        try{
            const [word, licence, color] = data.split(" ");
            if(App.parkingList.vehicleObj[licence]){
                console.log(APP_CONSTANT.COLORS.FgRed, `${REPLY.vehicleAlreadyReg(licence)}`);
            }else{
                if(App.availableSpot >= App.parkingList.spotList.length){
                    console.log(APP_CONSTANT.COLORS.FgRed,`${REPLY.noAvailableSpot}`);
                }else{
                    const tempSpot = App.availableSpot;
                    const spotStatus = App.parkingList.spotList[App.availableSpot].status();
                    //check available spot is active spot or not
                    if(!spotStatus){
                        App.availableSpot = App.findNextParkingSpot(App.availableSpot);
                    }
                    
                    if(!spotStatus && App.availableSpot === tempSpot){
                        //in case , if there is no active spot
                        console.log(APP_CONSTANT.COLORS.FgRed, `${REPLY.noActiveSpot}`);
                    }else{
                        const spot = App.parkingList.spotList[App.availableSpot];
                        const veh = new Car(licence, VehicleSize.Car, color, spot);
                        const ticketId = new Date().getTime()
                        const ticket:Ticket = new Ticket(ticketId,PaymentMode.Cash, 100, new Date().getTime(), App.availableSpot, veh);
                        App.parkingList.tickets[ticketId] = ticket;
                        spot.setVehicle(veh);
                        spot.setTicket(ticketId);
                        App.parkingList.vehicleObj[licence] = veh;
                        console.log(`${REPLY.vehicleReg(App.availableSpot)}`);
                        App.availableSpot = App.findNextParkingSpot(App.availableSpot);
                        if(App.availableSpot === tempSpot){
                            App.availableSpot = App.parkingList.spotList.length;
                        }
                    }
                }
            }
            App.start("2");
        }catch(err){
            console.log('Error in parkVehicle', err)
        }
    }

    static vehicleByColor(data: String): void {
        try{
            let [word, color] = data.split(" ");
            color = color.toLowerCase();
            const veh = [];
            Object.values(App.parkingList.vehicleObj).forEach((ele) => {
                if(ele.getColor() === color){
                    veh.push(ele.getLicense());
                }
            })
            console.log(veh.join(","));
            App.start("2");
        }catch(err) {
            console.log('Error in vehicleByColor', err)
        }
    }    

    static vehicleSlotByColor(data: String) : void {
        try{
            let [word, color] = data.split(" ");
            color = color.toLowerCase();
            const veh = [];
            Object.values(App.parkingList.vehicleObj).forEach((ele) => {
                if(ele.getColor() === color && ele.getParkingSpot()){
                    veh.push(ele.getParkingSpot().getSpot());
                }
            })
            console.log(veh.join(","));
            App.start("2");
        }
        catch(err){
            console.log('Error in vehicleSlotByColor', err)
        }
    }

    static vehicleByLicence(data: String): void {
        try{
            let [word, licence] = data.split(" ");
            const veh = App.parkingList.vehicleObj[licence];
            if(!veh){
                console.log(REPLY.notFound);
                return;
            }
            const spot = veh.getParkingSpot();
            if(spot){
                console.log(spot.getSpot());
            }else{
                console.log(APP_CONSTANT.COLORS.FgRed, REPLY.spotNotAssociated);
            }
            
            App.start("2");
        }
        catch(err){
            console.log('Error in vehicleByLicence', err)
        }
    }

    static unparkVehicle(data: String): void{
        try{
            const [word, num] = data.split(" ");
            const spot = Number(num);
            const veh = App.parkingList.spotList[spot].getVehicleDetails();
            if(veh){
                App.parkingList.spotList[spot].setVehicle(null);
                const ticketId = App.parkingList.spotList[spot].getTicket();
                App.parkingList.spotList[spot].setTicket(null);
                App.parkingList.tickets[ticketId].setTicketStatus(true);
                veh.setParkingSpot(null);
                App.availableSpot = spot < App.availableSpot ? spot : App.availableSpot;
                console.log(APP_CONSTANT.COLORS.FgMagenta,REPLY.slotAvailable(spot));
            }else{
                console.log(REPLY.slotAlreadyEmpty(spot));
            }
        }catch(err){
            console.log('Error in unparkVehicle', err);
        }
    }

    static getStatus(data: String): void{
        try{
            const list = [];
            let veh = null;
            for(let i = 1; i < App.parkingList.spotList.length; i++){
                veh = App.parkingList.spotList[i].getVehicleDetails();
                list.push({
                    slot: i,
                    licence: veh ? veh.getLicense() : 'Available',
                    color: veh ? veh.getColor() : 'Available',
                })
            }
            console.log(REPLY.printStatus(list));
        }
        catch(err){
            console.log('Error in getStatus', err);
        }
    }
}

App.init();