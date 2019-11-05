"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APP_CONSTANT = {
    FILE_PATH: './functional_spec/fixtures/file_input.txt',
    COLORS: {
        Reset: "\x1b[0m%s\x1b[0m",
        Bright: "\x1b[1m%s\x1b[0m",
        Dim: "\x1b[2m%s\x1b[0m",
        Underscore: "\x1b[4m%s\x1b[0m",
        Blink: "\x1b[5m%s\x1b[0m",
        Reverse: "\x1b[7m%s\x1b[0m",
        Hidden: "\x1b[8m%s\x1b[0m",
        FgBlack: "\x1b[30m%s\x1b[0m",
        FgRed: "\x1b[31m%s\x1b[0m",
        FgGreen: "\x1b[32m%s\x1b[0m",
        FgYellow: "\x1b[33m%s\x1b[0m",
        FgBlue: "\x1b[34m%s\x1b[0m",
        FgMagenta: "\x1b[35m%s\x1b[0m",
        FgCyan: "\x1b[36m%s\x1b[0m",
        FgWhite: "\x1b[37m%s\x1b[0m",
        BgBlack: "\x1b[40m%s\x1b[0m",
        BgRed: "\x1b[41m%s\x1b[0m",
        BgGreen: "\x1b[42m%s\x1b[0m",
        BgYellow: "\x1b[43m%s\x1b[0m",
        BgBlue: "\x1b[44m%s\x1b[0m",
        BgMagenta: "\x1b[45m%s\x1b[0m",
        BgCyan: "\x1b[46m%s\x1b[0m",
        BgWhite: "\x1b[47m%s\x1b[0m",
        CYAN: "\x1b[36m%s\x1b[0m",
        Green: "\x1b[32m",
        Normal: "\x1b[0m",
        Blue: "\x1b[34m",
        BGBrightCyan: "\x1b[34m%s\x1b[0m",
        Magenta: "\x1b[35m",
        Red: "\x1b[31m",
    }
};
exports.APP_CONSTANT = APP_CONSTANT;
var QUESTIONS = {
    startWith: "Welcome Let's start with the test...!!!\nFor input file type : " + APP_CONSTANT.COLORS.Blue + "1" + APP_CONSTANT.COLORS.Normal + "\nFor shell command type: " + APP_CONSTANT.COLORS.Blue + "2" + APP_CONSTANT.COLORS.Normal,
    startWithShell: "Type any of the following command:\nTo Create a parking lot type: " + APP_CONSTANT.COLORS.Magenta + "create_parking_lot <size of lot>" + APP_CONSTANT.COLORS.Normal + "\nTo Park a vehicle type: " + APP_CONSTANT.COLORS.Magenta + "park <car licence no.> <color of the car>" + APP_CONSTANT.COLORS.Normal + "\nTo leave any spot type: " + APP_CONSTANT.COLORS.Magenta + "leave <spot no>" + APP_CONSTANT.COLORS.Normal + "\nTo check parking status type: " + APP_CONSTANT.COLORS.Magenta + "status" + APP_CONSTANT.COLORS.Normal + "\nTo find the licence no by color of a car type: " + APP_CONSTANT.COLORS.Magenta + "registration_numbers_for_cars_with_colour <color of the car>" + APP_CONSTANT.COLORS.Normal + "\nTo find the slot number by car's color type: " + APP_CONSTANT.COLORS.Magenta + "slot_numbers_for_cars_with_colour <color of a car>" + APP_CONSTANT.COLORS.Normal + "\nTo find the slot number by car's licence number type: " + APP_CONSTANT.COLORS.Magenta + "slot_number_for_registration_number <licence no.>" + APP_CONSTANT.COLORS.Normal + "\nTo exit the game type: " + APP_CONSTANT.COLORS.FgRed + "exit" + APP_CONSTANT.COLORS.Normal
};
exports.QUESTIONS = QUESTIONS;
var KEY_WORD = {
    CREATE_PARKING_LOT: 'create_parking_lot',
    PARK: 'park',
    LEAVE: 'leave',
    STATUS: 'status',
    REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR: 'registration_numbers_for_cars_with_colour',
    SLOT_NUMBERS_FOR_CARS_WITH_COLOUR: 'slot_numbers_for_cars_with_colour',
    SLOT_NUMBER_FOR_REGISTRATION_NUMBER: 'slot_number_for_registration_number'
};
exports.KEY_WORD = KEY_WORD;
var REPLY = {
    parkingCreated: function (i) {
        return "Created a Parking Lot with " + i + " " + (i > 1 ? 'slots' : 'slot') + ".";
    },
    extraSlot: 'And added to previously created Parking Lot',
    vehicleAlreadyReg: function (licence) {
        return "Vehicle with " + licence + " is already registered";
    },
    vehicleReg: function (spot) {
        return "Allocated slot number: " + APP_CONSTANT.COLORS.Green + " " + spot + " " + APP_CONSTANT.COLORS.Normal;
    },
    noAvailableSpot: 'Sorry, parking lot is full. Kindly remove some vehicle from parking',
    noActiveSpot: 'Sorry, there are no active spots available. Kindly remove some vehicle from active parking',
    spotNotAssociated: 'Sorry, vehicle is not parked in our parking lot.',
    slotAvailable: function (slot) {
        return "Slot number " + slot + " is free";
    },
    slotAlreadyEmpty: function (slot) {
        return "Slot number " + slot + " is already Empty";
    },
    printStatus: function (list) {
        var str = APP_CONSTANT.COLORS.Blue + "Slot No.\t\t\tRegistration No.\t\t\tColour" + APP_CONSTANT.COLORS.Normal + "\n";
        list.forEach(function (ele) {
            if (ele.licence === REPLY.available) {
                str += ele.slot + "\t\t\t\t" + APP_CONSTANT.COLORS.Green + ele.licence + "\t\t\t\t" + ele.color + APP_CONSTANT.COLORS.Normal + "\n";
            }
            else {
                str += ele.slot + "\t\t\t\t" + ele.licence + "\t\t\t\t" + ele.color + "\n";
            }
        });
        return str;
    },
    readingFile: "Reading the file: file_input.txt, from the path : functional_spec/fixtures/",
    notFound: 'Not Found',
    available: "Available"
};
exports.REPLY = REPLY;
