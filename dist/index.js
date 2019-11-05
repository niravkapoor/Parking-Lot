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
var prompt_1 = require("./constant/prompt");
var readline = __importStar(require("readline"));
var parkingSpot_1 = __importDefault(require("./helper/parkingSpot"));
var config_1 = require("./config");
var vehicle_1 = require("./helper/vehicle");
var car_1 = require("./helper/car");
var ticket_1 = __importDefault(require("./helper/ticket"));
var fs = __importStar(require("fs"));
var App = /** @class */ (function () {
    function App() {
    }
    App.init = function () {
        try {
            App.parkingList = { spotList: [undefined], vehicleObj: {}, tickets: {} };
            App.operationPerformed = null;
            if (!App.standard_input) {
                App.standard_input = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout,
                    terminal: false
                });
                App.standard_input.on('line', App.start);
            }
            console.log(prompt_1.QUESTIONS.startWith);
        }
        catch (err) {
            console.log('Error in init', err);
        }
    };
    App.start = function (data) {
        var inputObj = new Set();
        data.split(" ").forEach(function (ele) {
            if (!inputObj.has(ele)) {
                inputObj.add(ele);
            }
        });
        if (App.operationPerformed === config_1.Operations.File) {
            App.readFileInput(data);
        }
        try {
            switch (true) {
                case data === "1":
                    App.operationPerformed = config_1.Operations.File;
                    console.log(prompt_1.QUESTIONS.fileName);
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
                case !!inputObj.has(prompt_1.KEY_WORD.EXIT):
                    console.log(prompt_1.APP_CONSTANT.COLORS.BgCyan, prompt_1.REPLY.thankYou);
                    process.exit();
                    break;
                case !!inputObj.has(prompt_1.KEY_WORD.BACK):
                    App.init();
                    break;
                default:
                    break;
            }
        }
        catch (err) {
            console.log('Error in start', err);
        }
    };
    App.processFile = function (file_name) {
        try {
            var inputs_1 = [];
            App.operationPerformed = null;
            console.log("" + prompt_1.REPLY.readingFile(file_name));
            var readInterface = readline.createInterface({
                input: fs.createReadStream("" + prompt_1.APP_CONSTANT.FILE_PATH + file_name),
                output: process.stdout,
                terminal: false
            });
            readInterface.on('line', function (line) {
                inputs_1.push(line);
            });
            readInterface.on('close', function () {
                inputs_1.forEach(function (ele) {
                    App.start(ele);
                });
            });
        }
        catch (err) {
        }
    };
    App.readFileInput = function (data) {
        try {
            var file_name_1 = data.split(" ")[0];
            if (!file_name_1) {
                console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, prompt_1.REPLY.fileNameNotEntered);
                return;
            }
            fs.exists("" + prompt_1.APP_CONSTANT.FILE_PATH + file_name_1, function (exist) {
                if (exist) {
                    App.processFile(file_name_1);
                }
                else {
                    console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, prompt_1.REPLY.fileNotExist(file_name_1));
                }
            });
        }
        catch (err) {
            console.log('Error in readFileInput', err);
            App.operationPerformed = null;
        }
    };
    App.createParkingLot = function (data) {
        try {
            var isAlreadyCreatd = App.parkingList.spotList.length;
            var _a = data.split(" "), word = _a[0], numSpotLoc = _a[1];
            var numSpot = Number(numSpotLoc);
            if (isNaN(numSpot) || numSpot < 1) {
                console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, prompt_1.REPLY.incorrectSlot);
                return;
            }
            for (var i = 1; i <= numSpot; i++) {
                App.parkingList.spotList.push(new parkingSpot_1.default(i, config_1.ParkingLevel.One, true, vehicle_1.VehicleSize.Car));
            }
            if (isAlreadyCreatd > 1) {
                console.log(prompt_1.APP_CONSTANT.COLORS.FgGreen, "" + prompt_1.REPLY.parkingCreated(numSpot) + prompt_1.REPLY.extraSlot);
            }
            else {
                App.availableSpot = 1;
                console.log(prompt_1.APP_CONSTANT.COLORS.FgGreen, prompt_1.REPLY.parkingCreated(numSpot));
            }
            //App.start("2");
        }
        catch (err) {
            console.log('Error in createParkingLot', err);
        }
    };
    App.findNextParkingSpot = function (spot) {
        try {
            for (var i = spot + 1; i < App.parkingList.spotList.length; i++) {
                if (!App.parkingList.spotList[i].getVehicleDetails() && App.parkingList.spotList[i].status()) {
                    return i;
                }
            }
            return spot;
        }
        catch (err) {
            console.log('Error in findNextParkingSpot', err);
        }
    };
    App.parkVehicle = function (data) {
        try {
            var _a = data.split(" "), word = _a[0], licence = _a[1], color = _a[2];
            if (App.parkingList.vehicleObj[licence]) {
                console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, "" + prompt_1.REPLY.vehicleAlreadyReg(licence));
            }
            else {
                if (App.availableSpot >= App.parkingList.spotList.length) {
                    console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, "" + prompt_1.REPLY.noAvailableSpot);
                }
                else {
                    var tempSpot = App.availableSpot;
                    var spotStatus = App.parkingList.spotList[App.availableSpot].status();
                    //check available spot is active spot or not
                    if (!spotStatus) {
                        App.availableSpot = App.findNextParkingSpot(App.availableSpot);
                    }
                    if (!spotStatus && App.availableSpot === tempSpot) {
                        //in case , if there is no active spot
                        console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, "" + prompt_1.REPLY.noActiveSpot);
                    }
                    else {
                        var spot = App.parkingList.spotList[App.availableSpot];
                        var veh = new car_1.Car(licence, vehicle_1.VehicleSize.Car, color, spot);
                        var ticketId = new Date().getTime();
                        var ticket = new ticket_1.default(ticketId, config_1.PaymentMode.Cash, 100, new Date().getTime(), App.availableSpot, veh);
                        App.parkingList.tickets[ticketId] = ticket;
                        spot.setVehicle(veh);
                        spot.setTicket(ticketId);
                        App.parkingList.vehicleObj[licence] = veh;
                        console.log("" + prompt_1.REPLY.vehicleReg(App.availableSpot));
                        App.availableSpot = App.findNextParkingSpot(App.availableSpot);
                        if (App.availableSpot === tempSpot) {
                            App.availableSpot = App.parkingList.spotList.length;
                        }
                    }
                }
            }
            //App.start("2");
        }
        catch (err) {
            console.log('Error in parkVehicle', err);
        }
    };
    App.vehicleByColor = function (data) {
        try {
            var _a = data.split(" "), word = _a[0], color_1 = _a[1];
            color_1 = color_1.toLowerCase();
            var veh_1 = [];
            Object.values(App.parkingList.vehicleObj).forEach(function (ele) {
                if (ele.getColor() === color_1) {
                    veh_1.push(ele.getLicense());
                }
            });
            console.log(veh_1.join(","));
            //App.start("2");
        }
        catch (err) {
            console.log('Error in vehicleByColor', err);
        }
    };
    App.vehicleSlotByColor = function (data) {
        try {
            var _a = data.split(" "), word = _a[0], color_2 = _a[1];
            color_2 = color_2.toLowerCase();
            var veh_2 = [];
            Object.values(App.parkingList.vehicleObj).forEach(function (ele) {
                if (ele.getColor() === color_2 && ele.getParkingSpot()) {
                    veh_2.push(ele.getParkingSpot().getSpot());
                }
            });
            console.log(veh_2.join(","));
            //App.start("2");
        }
        catch (err) {
            console.log('Error in vehicleSlotByColor', err);
        }
    };
    App.vehicleByLicence = function (data) {
        try {
            var _a = data.split(" "), word = _a[0], licence = _a[1];
            var veh = App.parkingList.vehicleObj[licence];
            if (!veh) {
                console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, prompt_1.REPLY.notFound);
                return;
            }
            var spot = veh.getParkingSpot();
            if (spot) {
                console.log(spot.getSpot());
            }
            else {
                console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, prompt_1.REPLY.spotNotAssociated);
            }
            //App.start("2");
        }
        catch (err) {
            console.log('Error in vehicleByLicence', err);
        }
    };
    App.unparkVehicle = function (data) {
        try {
            var _a = data.split(" "), word = _a[0], num = _a[1];
            var spot = Number(num);
            if (!App.parkingList.spotList[spot]) {
                console.log(prompt_1.APP_CONSTANT.COLORS.FgRed, prompt_1.REPLY.spotNotExist(spot));
                return;
            }
            var veh = App.parkingList.spotList[spot].getVehicleDetails();
            if (veh) {
                App.parkingList.spotList[spot].setVehicle(null);
                var ticketId = App.parkingList.spotList[spot].getTicket();
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
    };
    App.getStatus = function (data) {
        try {
            var list = [];
            var veh = null;
            for (var i = 1; i < App.parkingList.spotList.length; i++) {
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
    };
    App.standard_input = null;
    App.parkingList = null;
    App.operationPerformed = null;
    return App;
}());
App.init();
