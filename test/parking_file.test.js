const expect = require('chai').expect;
const { constants } = require('os');

const { APP_CONSTANT } = require('../dist/constant/prompt');
const  { ENTER, executeWithInput, createProcess } = require('./cmd');

describe("Parking Lot Input From file",  () => {
    let childProcess = null;
    before((done) => {
        childProcess = createProcess('./dist/index.js');
        done();
    });

    it("start the process for 1st option",  async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['1',ENTER]);
        const res = await childProcess.updateCB();

        expect(res).to.include(`${APP_CONSTANT.COLORS.Green}Created a Parking Lot with 6 slots.${APP_CONSTANT.COLORS.Normal}\nAllocated slot number: ${APP_CONSTANT.COLORS.Green} 1 ${APP_CONSTANT.COLORS.Normal}\nAllocated slot number: ${APP_CONSTANT.COLORS.Green} 2 ${APP_CONSTANT.COLORS.Normal}\nAllocated slot number: ${APP_CONSTANT.COLORS.Green} 3 ${APP_CONSTANT.COLORS.Normal}\nAllocated slot number: ${APP_CONSTANT.COLORS.Green} 4 ${APP_CONSTANT.COLORS.Normal}\nAllocated slot number: ${APP_CONSTANT.COLORS.Green} 5 ${APP_CONSTANT.COLORS.Normal}\nAllocated slot number: ${APP_CONSTANT.COLORS.Green} 6 ${APP_CONSTANT.COLORS.Normal}\n${APP_CONSTANT.COLORS.Magenta}Slot number 4 is free${APP_CONSTANT.COLORS.Normal}\n${APP_CONSTANT.COLORS.Blue}Slot No.\t\t\tRegistration No.\t\t\tColour${APP_CONSTANT.COLORS.Normal}\n1\t\t\t\tKA-01-HH-1234\t\t\t\twhite\n2\t\t\t\tKA-01-HH-9999\t\t\t\twhite\n3\t\t\t\tKA-01-BB-0001\t\t\t\tblack\n4\t\t\t\t${APP_CONSTANT.COLORS.Green}Available\t\t\t\tAvailable${APP_CONSTANT.COLORS.Normal}\n5\t\t\t\tKA-01-HH-2701\t\t\t\tblue\n6\t\t\t\tKA-01-HH-3141\t\t\t\tblack\n\nAllocated slot number: ${APP_CONSTANT.COLORS.Green} 4 ${APP_CONSTANT.COLORS.Normal}\n${APP_CONSTANT.COLORS.Red}Sorry, parking lot is full. Kindly remove some vehicle from parking${APP_CONSTANT.COLORS.Normal}\nKA-01-HH-1234,KA-01-HH-9999,KA-01-P-333\n1,2,4\n6\n${APP_CONSTANT.COLORS.Red}Not Found${APP_CONSTANT.COLORS.Normal}`);       
    })

    after((done) => {
        childProcess.kill(constants.signals.SIGTERM);
        done();
    })
});
