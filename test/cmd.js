const { existsSync } = require('fs');
const spawn = require('cross-spawn');
const { constants } = require('os');

function createProcess(processPath) {
    if (!processPath || !existsSync(processPath)) {
        throw new Error('Invalid process path');
    }

    let successCB = null, errorCB = null, result = "";
    const childProcess =  spawn('node', [processPath]);
    childProcess.stderr.on('data', data => {
        console.log('error:', data.toString());
    });
    
    childProcess.stdout.on('data', data => {
        result += data.toString();
        setTimeout((data) => {
            successCB && successCB(result);
        }, 400)
    });

    childProcess.stderr.once('data', (err, data) => {
        errorCB && errorCB(err.toString());
        childProcess.kill(constants.signals.SIGTERM);
    });

    childProcess.on('error', (err) => {
        errorCB && errorCB(err.toString());
        childProcess.kill(constants.signals.SIGTERM);
    });

    const updateCB = () => {
        return new Promise((resolve, reject) => {
           successCB = resolve;
           errorCB = reject;
        })
       
    }

    const updateResult = () => {
        //empty the result of previous test case
        result = "";
    }

    childProcess.updateCB = updateCB;
    childProcess.updateResult = updateResult;

    return childProcess;
}

function executeWithInput(childProcess, inputs = []) {
    if (!Array.isArray(inputs) && !inputs.length) {
     
    }
    const timeout = 100

    const loop = (inputs, resolve, reject) => {
        if (!inputs.length) {
            resolve(true);
            return;
        }
        
        setTimeout(() => {
            childProcess.stdin.write(inputs[0]);
             loop(inputs.slice(1), resolve, reject);
        }, timeout);
    };
    return new Promise((resolve, reject) => { loop(inputs, resolve, reject)});
}

module.exports = {
    executeWithInput,
    createProcess,
    ENTER: '\x0D',
};