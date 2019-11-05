const expect = require('chai').expect;
const { constants } = require('os');

const { APP_CONSTANT } = require('../dist/constant/prompt');
const  { ENTER, executeWithInput, createProcess } = require('./cmd');

describe("Parking Lot User Input",  () => {
    let childProcess = null;
    before((done) => {
        childProcess = createProcess('./dist/index.js');
        done();
    });

    it("start the process for 2nd options",  async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['2',ENTER]);
        const res = await childProcess.updateCB();
        expect(res).to.include("Welcome, Let's start with the test");       
    })

    it("can create a parking lot", async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['create_parking_lot 2', ENTER]);
        const res = await childProcess.updateCB();
        expect(res).to.include('Created a Parking Lot with 2 slots.');
    });

    it("can park a car", async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['park KA-01-HH-1234 White', ENTER])
        const res = await childProcess.updateCB();
        expect(res).to.include(`Allocated slot number: ${APP_CONSTANT.COLORS.Green} 1`);
    });

    it("can park a car another car", async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['park KA-01-HH-9999 White', ENTER])
        const res = await childProcess.updateCB();
        expect(res).to.include(`Allocated slot number: ${APP_CONSTANT.COLORS.Green} 2`);
    });

    it("can park a car 3rd car", async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['park KA-01-BB-0001 Black', ENTER])
        const res = await childProcess.updateCB();
        expect(res).to.include(`Sorry, parking lot is full. Kindly remove some vehicle from parking`);
    });

    it("leave a spot", async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['leave 2', ENTER])
        const res = await childProcess.updateCB();
        expect(res).to.include(`Slot number 2 is free`);
    });

    it("already empty spot", async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['leave 2', ENTER])
        const res = await childProcess.updateCB();
        expect(res).to.include(`Slot number 2 is already Empty`);
    });

    it("can create a parking lot", async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['create_parking_lot 2', ENTER]);
        const res = await childProcess.updateCB();
        expect(res).to.include('Created a Parking Lot with 2 slots.And added to previously created Parking Lot');
    });

    it("can show status", async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['status', ENTER]);
        const res = await childProcess.updateCB();
        expect(res).to.include(`${APP_CONSTANT.COLORS.Blue}Slot No.\t\t\tRegistration No.\t\t\tColour${APP_CONSTANT.COLORS.Normal}\n1\t\t\t\tKA-01-HH-1234\t\t\t\twhite\n2\t\t\t\t${APP_CONSTANT.COLORS.Green}Available\t\t\t\tAvailable${APP_CONSTANT.COLORS.Normal}\n3\t\t\t\t${APP_CONSTANT.COLORS.Green}Available\t\t\t\tAvailable${APP_CONSTANT.COLORS.Normal}\n4\t\t\t\t${APP_CONSTANT.COLORS.Green}Available\t\t\t\tAvailable${APP_CONSTANT.COLORS.Normal}\n\n`);
    });

    if("slot doesn't exist", async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['leave 100', ENTER])
        const res = await childProcess.updateCB();
        expect(res).to.include(`${APP_CONSTANT.COLORS.Red}Spot 100 doesn't exist`);
    })

    after((done) => {
        childProcess.kill(constants.signals.SIGTERM);
        done();
    })
});

describe("Parking Lot Shouldn't be created",  () => {
    let childProcess = null;
    before((done) => {
        childProcess = createProcess('./dist/index.js');
        done();
    });

    it("should not create parking slot",  async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['create_parking_lot 0',ENTER]);
        const res = await childProcess.updateCB();
        expect(res).to.include("Sorry, incorrect no. of slots are given as an input");       
    })

    it("should not create parking slot for NAN",  async () => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['create_parking_lot',ENTER]);
        const res = await childProcess.updateCB();
        expect(res).to.include("Sorry, incorrect no. of slots are given as an input");       
    })

    after((done) => {
        childProcess.kill(constants.signals.SIGTERM);
        done();
    })
});

describe("exit the game", () => {
    let childProcess = null;
    before((done) => {
        childProcess = createProcess('./dist/index.js');
        done();
    });

    it("exit the game", async() => {
        childProcess.updateResult('');
        await executeWithInput(childProcess,['exit',ENTER]);
        const res = await childProcess.updateCB();
        expect(res).to.include("Thank You, for playing with us");
    })

    after((done) => {
        childProcess.kill(constants.signals.SIGTERM);
        done();
    })
})