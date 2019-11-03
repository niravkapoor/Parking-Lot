"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_1 = require("./constant/prompt");
const readline = __importStar(require("readline"));
const parkingSpot_1 = __importDefault(require("./helper/parkingSpot"));
const config_1 = require("./config");
const vehicle_1 = require("./helper/vehicle");
const car_1 = require("./helper/car");
const ticket_1 = __importDefault(require("./helper/ticket"));
const fs = __importStar(require("fs"));
class App {
    static init() {
        try {
            App.parkingList = { spotList: [undefined], vehicleObj: {}, tickets: {} };
            App.standard_input = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
                terminal: false
            });
            console.log(prompt_1.QUESTIONS.startWith);
            App.standard_input.on('line', App.start);
        }
        catch (err) {
            console.log('Error in init', err);
        }
    }
    static start(data) {
        const inputObj = new Set();
        data.split(" ").forEach((ele) => {
            if (!inputObj.has(ele)) {
                inputObj.add(ele);
            }
        });
        try {
            switch (true) {
                case data === "1":
                    App.readFileInput();
                    break;
                case data === "2":
                    if (App.operationPerformed !== config_1.Operations.File)
                        console.log(prompt_1.QUESTIONS.startWithShell);
                    break;
                case !!inputObj.has(prompt_1.KEY_WORD.CREATE_PARKING_LOT):
                    App.createParkingLot(data);
                    break;
                case !!inputObj.has(prompt_1.KEY_WORD.PARK):
                    App.parkVehicle(data);
                    break;
                case !!inputObj.has(prompt_1.KEY_WORD.REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR):
                    App.vehicleByColor(data);
                    break;
                case !!inputObj.has(prompt_1.KEY_WORD.SLOT_NUMBERS_FOR_CARS_WITH_COLOUR):
                    App.vehicleSlotByColor(data);
                    break;
                case !!inputObj.has(prompt_1.KEY_WORD.SLOT_NUMBER_FOR_REGISTRATION_NUMBER):
                    App.vehicleByLicence(data);
                    break;
                case !!inputObj.has(prompt_1.KEY_WORD.LEAVE):
                    App.unparkVehicle(data);
                    break;
                case !!inputObj.has(prompt_1.KEY_WORD.STATUS):
                    App.getStatus(data);
                    break;
                default:
                    break;
            }
        }
        catch (err) {
            console.log('Error in start', err);
        }
    }
    static readFileInput() {
        try {
            const inputs = [];
            App.operationPerformed = config_1.Operations.File;
            console.log(`${prompt_1.REPLY.readingFile}`);
            const readInterface = readline.createInterface({
                input: fs.createReadStream(`${prompt_1.APP_CONSTANT.FILE_PATH}`),
                output: process.stdout,
                terminal: false
            });
            readInterface.on('line', (line) => {
                inputs.push(line);
            });
            readInterface.on('close', () => {
                inputs.forEach((ele) => {
                    App.start(ele);
                });
            });
        }
        catch (err) {
            console.log('Error in readFileInput', err);
        }
    }
    static createParkingLot(data) {
        try {
            const isAlreadyCreatd = App.parkingList.spotList.length;
            const [word, numSpotLoc] = data.split(" ");
            let numSpot = Number(numSpotLoc);
            for (let i = 1; i <= numSpot; i++) {
                App.parkingList.spotList.push(new parkingSpot_1.default(i, config_1.ParkingLevel.One, true, vehicle_1.VehicleSize.Car));
            }
            if (isAlreadyCreatd > 1) {
                console.log(prompt_1.APP_CONSTANT.COLORS.FgGreen, `${prompt_1.REPLY.parkingCreated(numSpot)}${prompt_1.REPLY.extraSlot}`);
            }
            else {
                App.availableSpot = 1;
                console.log(prompt_1.APP_CONSTANT.COLORS.FgGreen, prompt_1.REPLY.parkingCreated(numSpot));
            }
            App.start("2");
        }
        catch (err) {
            console.log('Error in createParkingLot', err);
        }
    }
    static findNextParkingSpot(spot) {
        try {
            for (let i = spot + 1; i < App.parkingList.spotList.length; i++) {
                if (!App.parkingList.spotList[i].getVehicleDetails() && App.parkingList.spotList[i].status()) {
                    return i;
                }
            }
            return spot;
        }
        catch (err) {
            console.log('Error in findNextParkingSpot', err);
        }
    }
    static parkVehicle(data) {
        try {
            const [word, licence, color] = data.split(" ");
            if (App.parkingList.vehicleObj[licence]) {
                console.log(`${prompt_1.REPLY.vehicleAlreadyReg(licence)}`);
            }
            else {
                if (App.availableSpot >= App.parkingList.spotList.length) {
                    console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, `${prompt_1.REPLY.noAvailableSpot}`);
                }
                else {
                    const tempSpot = App.availableSpot;
                    const spotStatus = App.parkingList.spotList[App.availableSpot].status();
                    //check available spot is active spot or not
                    if (!spotStatus) {
                        App.availableSpot = App.findNextParkingSpot(App.availableSpot);
                    }
                    if (!spotStatus && App.availableSpot === tempSpot) {
                        //in case , if there is no active spot
                        console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, `${prompt_1.REPLY.noActiveSpot}`);
                    }
                    else {
                        const spot = App.parkingList.spotList[App.availableSpot];
                        const veh = new car_1.Car(licence, vehicle_1.VehicleSize.Car, color, spot);
                        const ticketId = new Date().getTime();
                        const ticket = new ticket_1.default(ticketId, config_1.PaymentMode.Cash, 100, new Date().getTime(), App.availableSpot, veh);
                        App.parkingList.tickets[ticketId] = ticket;
                        spot.setVehicle(veh);
                        spot.setTicket(ticketId);
                        App.parkingList.vehicleObj[licence] = veh;
                        console.log(`${prompt_1.REPLY.vehicleReg(App.availableSpot)}`);
                        App.availableSpot = App.findNextParkingSpot(App.availableSpot);
                        if (App.availableSpot === tempSpot) {
                            App.availableSpot = App.parkingList.spotList.length;
                        }
                    }
                }
            }
            App.start("2");
        }
        catch (err) {
            console.log('Error in parkVehicle', err);
        }
    }
    static vehicleByColor(data) {
        try {
            let [word, color] = data.split(" ");
            color = color.toLowerCase();
            const veh = [];
            Object.values(App.parkingList.vehicleObj).forEach((ele) => {
                if (ele.getColor() === color) {
                    veh.push(ele.getLicense());
                }
            });
            console.log(veh.join(","));
            App.start("2");
        }
        catch (err) {
            console.log('Error in vehicleByColor', err);
        }
    }
    static vehicleSlotByColor(data) {
        try {
            let [word, color] = data.split(" ");
            color = color.toLowerCase();
            const veh = [];
            Object.values(App.parkingList.vehicleObj).forEach((ele) => {
                if (ele.getColor() === color && ele.getParkingSpot()) {
                    veh.push(ele.getParkingSpot().getSpot());
                }
            });
            console.log(veh.join(","));
            App.start("2");
        }
        catch (err) {
            console.log('Error in vehicleSlotByColor', err);
        }
    }
    static vehicleByLicence(data) {
        try {
            let [word, licence] = data.split(" ");
            const veh = App.parkingList.vehicleObj[licence];
            if (!veh) {
                console.log(prompt_1.REPLY.notFound);
                return;
            }
            const spot = veh.getParkingSpot();
            if (spot) {
                console.log(spot.getSpot());
            }
            else {
                console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, prompt_1.REPLY.spotNotAssociated);
            }
            App.start("2");
        }
        catch (err) {
            console.log('Error in vehicleByLicence', err);
        }
    }
    static unparkVehicle(data) {
        try {
            const [word, num] = data.split(" ");
            const spot = Number(num);
            const veh = App.parkingList.spotList[spot].getVehicleDetails();
            if (veh) {
                App.parkingList.spotList[spot].setVehicle(null);
                const ticketId = App.parkingList.spotList[spot].getTicket();
                App.parkingList.spotList[spot].setTicket(null);
                App.parkingList.tickets[ticketId].setTicketStatus(true);
                veh.setParkingSpot(null);
                App.availableSpot = spot < App.availableSpot ? spot : App.availableSpot;
                console.log(prompt_1.APP_CONSTANT.COLORS.FgMagenta, prompt_1.REPLY.slotAvailable(spot));
            }
            else {
                console.log(prompt_1.REPLY.slotAlreadyEmpty(spot));
            }
        }
        catch (err) {
            console.log('Error in unparkVehicle', err);
        }
    }
    static getStatus(data) {
        try {
            const list = [];
            let veh = null;
            for (let i = 1; i < App.parkingList.spotList.length; i++) {
                veh = App.parkingList.spotList[i].getVehicleDetails();
                list.push({
                    slot: i,
                    licence: veh ? veh.getLicense() : 'Available',
                    color: veh ? veh.getColor() : 'Available',
                });
            }
            console.log(prompt_1.REPLY.printStatus(list));
        }
        catch (err) {
            console.log('Error in getStatus', err);
        }
    }
}
App.parkingList = null;
App.operationPerformed = null;
App.init();
