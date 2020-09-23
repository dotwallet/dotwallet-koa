"use strict";
var auth_1 = require("./auth");
var order_1 = require("./order");
var autopayment_1 = require("./autopayment");
var saveData_1 = require("./saveData");
var DotWallet = /** @class */ (function () {
    function DotWallet(appId, secret) {
        this.APP_ID = appId;
        this.SECRET = secret;
        this.handleAuthResponse = auth_1.handleAuthResponse(this.APP_ID, this.SECRET);
        this.refreshAccess = auth_1.refreshAccess(this.APP_ID);
        this.handleOrder = order_1.handleOrder(this.APP_ID, this.SECRET);
        this.getOrderStatus = order_1.getOrderStatus(this.APP_ID, this.SECRET);
        this.autopayment = autopayment_1.autopayment(this.APP_ID, this.SECRET);
        this.getHostedAccount = saveData_1.getHostedAccount(this.APP_ID, this.SECRET);
        this.hostedAccountBalance = saveData_1.hostedAccountBalance(this.APP_ID, this.SECRET);
        this.saveData = saveData_1.saveData(this.APP_ID, this.SECRET);
    }
    return DotWallet;
}());
var caller = function (appId, secret) { return new DotWallet(appId, secret); };
module.exports = caller;
