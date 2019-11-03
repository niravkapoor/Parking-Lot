"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParkingLevel;
(function (ParkingLevel) {
    ParkingLevel[ParkingLevel["One"] = 0] = "One";
    ParkingLevel[ParkingLevel["Two"] = 1] = "Two";
    ParkingLevel[ParkingLevel["Three"] = 2] = "Three";
})(ParkingLevel = exports.ParkingLevel || (exports.ParkingLevel = {}));
var PaymentMode;
(function (PaymentMode) {
    PaymentMode[PaymentMode["Cash"] = 0] = "Cash";
    PaymentMode[PaymentMode["CC"] = 1] = "CC";
    PaymentMode[PaymentMode["DC"] = 2] = "DC";
    PaymentMode[PaymentMode["Paytm"] = 3] = "Paytm";
    PaymentMode[PaymentMode["PhonePe"] = 4] = "PhonePe";
})(PaymentMode = exports.PaymentMode || (exports.PaymentMode = {}));
var Operations;
(function (Operations) {
    Operations[Operations["File"] = 0] = "File";
    Operations[Operations["Input"] = 1] = "Input";
})(Operations = exports.Operations || (exports.Operations = {}));
