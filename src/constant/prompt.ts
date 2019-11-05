import { IPromtQuest, IReply } from '../interface';
const APP_CONSTANT = {
    FILE_PATH: './bin/',
    COLORS: {
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
        CYAN: "\x1b[36m%s\x1b[0m",
        Green: "\x1b[32m",
        Normal: "\x1b[0m",
        Blue: "\x1b[34m",
        BGBrightCyan: "\x1b[34m%s\x1b[0m",
        Magenta: "\x1b[35m",
        Red: "\x1b[31m",
        Yellow: "\x1b[33m"
    }
}

const QUESTIONS: IPromtQuest = {
    startWith: `Welcome, Let's start with the test...!!!\nFor input file type : ${APP_CONSTANT.COLORS.Blue}1${APP_CONSTANT.COLORS.Normal}\nFor shell command type: ${APP_CONSTANT.COLORS.Blue}2${APP_CONSTANT.COLORS.Normal}`,
    fileName: `Type the File name, file needs to be in (bin/)`,
    startWithShell: `Type any of the following command:\nTo Create a parking lot type: ${APP_CONSTANT.COLORS.Magenta}create_parking_lot <size of lot>${APP_CONSTANT.COLORS.Normal}\nTo Park a vehicle type: ${APP_CONSTANT.COLORS.Magenta}park <car licence no.> <color of the car>${APP_CONSTANT.COLORS.Normal}\nTo leave any spot type: ${APP_CONSTANT.COLORS.Magenta}leave <spot no>${APP_CONSTANT.COLORS.Normal}\nTo check parking status type: ${APP_CONSTANT.COLORS.Magenta}status${APP_CONSTANT.COLORS.Normal}\nTo find the licence no by color of a car type: ${APP_CONSTANT.COLORS.Magenta}registration_numbers_for_cars_with_colour <color of the car>${APP_CONSTANT.COLORS.Normal}\nTo find the slot number by car's color type: ${APP_CONSTANT.COLORS.Magenta}slot_numbers_for_cars_with_colour <color of a car>${APP_CONSTANT.COLORS.Normal}\nTo find the slot number by car's licence number type: ${APP_CONSTANT.COLORS.Magenta}slot_number_for_registration_number <licence no.>${APP_CONSTANT.COLORS.Normal}\nTo exit the game type: ${APP_CONSTANT.COLORS.Red}exit${APP_CONSTANT.COLORS.Normal}\nTo move to the main menu type: ${APP_CONSTANT.COLORS.Red}back${APP_CONSTANT.COLORS.Normal}`

}

const KEY_WORD = {
    CREATE_PARKING_LOT: 'create_parking_lot',
    PARK: 'park',
    LEAVE: 'leave',
    STATUS: 'status',
    REGISTRATION_NUMBERS_FOR_CARS_WITH_COLOUR: 'registration_numbers_for_cars_with_colour',
    SLOT_NUMBERS_FOR_CARS_WITH_COLOUR: 'slot_numbers_for_cars_with_colour',
    SLOT_NUMBER_FOR_REGISTRATION_NUMBER: 'slot_number_for_registration_number',
    EXIT: 'exit',
    BACK: 'back'
}

const REPLY: IReply = {
    parkingCreated(i: number): String {
        return `Created a Parking Lot with ${i} ${i > 1 ? 'slots' : 'slot'}.`;
    },
    extraSlot: 'And added to previously created Parking Lot',
    vehicleAlreadyReg(licence: String): String { 
        return `Vehicle with ${licence} is already registered` 
    },
    vehicleReg(spot: Number): String {
        return `Allocated slot number: ${APP_CONSTANT.COLORS.Green} ${spot} ${APP_CONSTANT.COLORS.Normal}`;
    },
    noAvailableSpot: 'Sorry, parking lot is full. Kindly remove some vehicle from parking',
    noActiveSpot: 'Sorry, there are no active spots available. Kindly remove some vehicle from active parking',
    spotNotAssociated: 'Sorry, vehicle is not parked in our parking lot.',
    slotAvailable(slot: number): String {
        return `Slot number ${slot} is free`
    },
    slotAlreadyEmpty(slot: number): String {
        return `Slot number ${slot} is already Empty`
    },
    printStatus(list: any): String {
        let str =  `${APP_CONSTANT.COLORS.Blue}Slot No.\t\t\tRegistration No.\t\t\tColour${APP_CONSTANT.COLORS.Normal}\n`;
        list.forEach((ele) => {
            if(ele.licence === REPLY.available){
                str += `${ele.slot}\t\t\t\t${APP_CONSTANT.COLORS.Green}${ele.licence}\t\t\t\t${ele.color}${APP_CONSTANT.COLORS.Normal}\n`
            }else{
                str += `${ele.slot}\t\t\t\t${ele.licence}\t\t\t\t${ele.color}\n`
            }
        })
        return str;
    },
    readingFile(file: String): String{
        return `Reading the file: ${APP_CONSTANT.COLORS.Yellow}${file}${APP_CONSTANT.COLORS.Normal}, from the path : ${APP_CONSTANT.COLORS.Yellow}${APP_CONSTANT.FILE_PATH}${APP_CONSTANT.COLORS.Normal}`
    },
    notFound: 'Not Found',
    available: "Available",
    incorrectSlot: `Sorry, incorrect no. of slots are given as an input.`,
    fileNameNotEntered: `Kindly, enter the file name Or type back`,
    fileNotExist(file_name: String): String {
        return `Sorry, file : ${file_name} at path : ${APP_CONSTANT.FILE_PATH} doesn't exist Or Type back`
    },
    spotNotExist(spot: Number): String{
        return `Spot ${spot} doesn't exist`;
    },
    spotNotNumber: `Kindly, enter spot no. as integer`,
    thankYou: 'Thank You, for playing with us',
    cmdNotMatch: `Command doesn't match, type any of the below comands`
}

export {
    QUESTIONS,
    KEY_WORD,
    REPLY,
    APP_CONSTANT
}