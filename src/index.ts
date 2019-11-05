import { QUESTIONS, KEY_WORD, REPLY, APP_CONSTANT } from './constant/prompt';
import * as readline from 'readline';
import { IParkingList } from './interface';
import ParkingSpot from './helper/parkingSpot';
import { ParkingLevel, PaymentMode, Operations } from './config';
import { VehicleSize } from './helper/vehicle';
import { Car } from './helper/car';
import Ticket from './helper/ticket';
import * as fs from 'fs';
import Logger from './helper/logger';

class App {
    private static standard_input: any = null;
    private static parkingList: IParkingList = null;
    private static availableSpot: number;
    private static operationPerformed: Operations = null;
    static init(): void{
        try{
            App.parkingList = { spotList: [undefined], vehicleObj: {}, tickets: {}};
            App.operationPerformed = null;
            if(!App.standard_input){
                App.standard_input = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false
                });
                App.standard_input.on('line', App.start);
            }
            
            console.log(QUESTIONS.startWith);              
        }
        catch(err){
            Logger.log('init', 'index.ts', err, {});
        }
    }

    static start(data: any): void {
        const inputObj = new Set();
        data.split(" ").forEach((ele) => {
            if(!inputObj.has(ele)){
                inputObj.add(ele);
            }
        })
        if(App.operationPerformed === Operations.File && !inputObj.has(KEY_WORD.BACK)){
            App.readFileInput(data);
            return;
        }

        try{            
            switch(true){
                case data === "1":
                    if(App.operationPerformed === Operations.Input){
                        console.log(APP_CONSTANT.COLORS.FgRed, 'Type back, to enter into the file read input')
                    }else{
                        App.operationPerformed = Operations.File;
                        console.log(QUESTIONS.fileName);
                    }
                    break;
                case data === "2":
                    // if(App.operationPerformed !== Operations.File)
                    App.operationPerformed = Operations.Input;
                    console.log(QUESTIONS.startWithShell);
                    break;
                case !!inputObj.has(KEY_WORD.CREATE_PARKING_LOT):
                    App.operationPerformed = Operations.Input;
                    App.createParkingLot(data);
                    break;
                case !!inputObj.has(KEY_WORD.PARK):
                    App.operationPerformed = Operations.Input;
                    App.parkVehicle(data);
                    break;
                case !!inputObj.has(KEY_WORD.REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR):
                    App.operationPerformed = Operations.Input;
                    App.vehicleByColor(data);
                    break;
                case !!inputObj.has(KEY_WORD.SLOT_NUMBERS_FOR_CARS_WITH_COLOUR):
                    App.operationPerformed = Operations.Input;
                    App.vehicleSlotByColor(data);
                    break;
                case !!inputObj.has(KEY_WORD.SLOT_NUMBER_FOR_REGISTRATION_NUMBER):
                    App.operationPerformed = Operations.Input;
                    App.vehicleByLicence(data);
                    break;
                case !!inputObj.has(KEY_WORD.LEAVE):
                    App.operationPerformed = Operations.Input;
                    App.unparkVehicle(data);
                    break;
                case !!inputObj.has(KEY_WORD.STATUS):
                    App.operationPerformed = Operations.Input;
                    App.getStatus(data);
                    break;
                case !!inputObj.has(KEY_WORD.EXIT):
                    console.log(APP_CONSTANT.COLORS.BgCyan,REPLY.thankYou);
                    process.exit();
                    break;
                case !!inputObj.has(KEY_WORD.BACK):
                    App.init();
                    break;
                default:
                    console.log(APP_CONSTANT.COLORS.FgRed, REPLY.cmdNotMatch);
                    console.log('App.operationPerformed', App.operationPerformed)
                    if(App.operationPerformed === Operations.File){
                        console.log(QUESTIONS.fileName);
                    }else{
                        if(App.operationPerformed === Operations.Input)
                            console.log(QUESTIONS.startWithShell);
                        else{
                            console.log(QUESTIONS.startWith);  
                        }
                    }
                    break;
            }
            
        }
        catch(err){
            Logger.log('start', 'index.ts', err, data);
        }
    }

    static processFile(file_name: String): void {
        try{
            const inputs = [];
            App.operationPerformed = null;
            console.log(`${REPLY.readingFile(file_name)}`);
            const readInterface = readline.createInterface({
                input: fs.createReadStream(`${APP_CONSTANT.FILE_PATH}${file_name}`),
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
            Logger.log('processFile', 'index.ts', err, file_name);
        }
    }

    static readFileInput(data: string): void {
        try{
            const [file_name] = data.split(" ");
            if(!file_name){
                console.log(APP_CONSTANT.COLORS.FgRed, REPLY.fileNameNotEntered);
                return;
            }
            fs.exists(`${APP_CONSTANT.FILE_PATH}${file_name}`, (exist) => {
                if(exist){
                    App.processFile(file_name);
                }else{
                    console.log(APP_CONSTANT.COLORS.FgRed, REPLY.fileNotExist(file_name));
                }
            });
        }catch(err){
            Logger.log('readFileInput', 'index.ts', err, data);
            App.operationPerformed = null;
        }
    }

    static createParkingLot(data: String): void {
        try{
            const isAlreadyCreatd = App.parkingList.spotList.length;
            const [word, numSpotLoc] = data.split(" ");
           
            let numSpot = Number(numSpotLoc);
            if(isNaN(numSpot) || numSpot < 1){
                console.log(APP_CONSTANT.COLORS.FgRed ,REPLY.incorrectSlot);
                return;
            }

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
            //App.start("2");
        }
        catch(err) {
            Logger.log('createParkingLot', 'index.ts', err, data);
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
            Logger.log('findNextParkingSpot', 'index.ts', err, spot);
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
            //App.start("2");
        }catch(err){
            Logger.log('parkVehicle', 'index.ts', err, data);
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
            //App.start("2");
        }catch(err) {
            Logger.log('vehicleByColor', 'index.ts', err, data);
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
            //App.start("2");
        }
        catch(err){
            Logger.log('vehicleSlotByColor', 'index.ts', err, data);
        }
    }

    static vehicleByLicence(data: String): void {
        try{
            let [word, licence] = data.split(" ");
            const veh = App.parkingList.vehicleObj[licence];
            if(!veh){
                console.log(APP_CONSTANT.COLORS.FgRed ,REPLY.notFound);
                return;
            }
            const spot = veh.getParkingSpot();
            if(spot){
                console.log(spot.getSpot());
            }else{
                console.log(APP_CONSTANT.COLORS.FgRed, REPLY.spotNotAssociated);
            }
            
            //App.start("2");
        }
        catch(err){
            Logger.log('vehicleByLicence', 'index.ts', err, data);
        }
    }

    static unparkVehicle(data: String): void{
        try{
            const [word, num] = data.split(" ");
            const spot = Number(num);
            if(isNaN(spot)){
                console.log(APP_CONSTANT.COLORS.FgRed,REPLY.spotNotNumber);
                return;
            }
            if(!App.parkingList.spotList[spot]){
                console.log(APP_CONSTANT.COLORS.FgRed,REPLY.spotNotExist(spot));
                return;
            }
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
            Logger.log('unparkVehicle', 'index.ts', err, data)
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
            Logger.log('getStatus', 'index.ts', err, data);
        }
    }
}

App.init();