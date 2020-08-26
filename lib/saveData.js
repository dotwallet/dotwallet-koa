"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hostedAccountBalance = exports.getHostedAccount = exports.saveData = void 0;
var axios_1 = require("axios");
exports.saveData = function (APP_ID, SECRET) {
    return function (data, dataType, log) {
        if (dataType === void 0) { dataType = 0; }
        return __awaiter(void 0, void 0, void 0, function () {
            var saveDataOptions, res, saveDataResponse, returnData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        saveDataOptions = {
                            headers: {
                                'Content-Type': 'application/json',
                                appid: APP_ID,
                                appsecret: SECRET,
                            },
                            method: 'POST',
                            data: {
                                coin_type: 'BSV',
                                data: dataType === 0 ? JSON.stringify(data) : data,
                                data_type: dataType,
                            },
                        };
                        return [4 /*yield*/, axios_1.default('https://www.ddpurse.com/platform/openapi/v2/push_chain_data', saveDataOptions)];
                    case 1:
                        res = _a.sent();
                        saveDataResponse = res.data;
                        if (log)
                            console.log('==============saveDataResponse==============', saveDataResponse);
                        if (saveDataResponse.code !== 0)
                            throw saveDataResponse;
                        returnData = saveDataResponse.data;
                        return [2 /*return*/, returnData];
                    case 2:
                        err_1 = _a.sent();
                        if (log)
                            console.log('==============err==============\n', err_1);
                        return [2 /*return*/, err_1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
};
exports.getHostedAccount = function (APP_ID, SECRET) {
    return function (coinType, log) {
        if (coinType === void 0) { coinType = 'BSV'; }
        return __awaiter(void 0, void 0, void 0, function () {
            var getHostedOptions, res, getHostedData, returnData, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        getHostedOptions = {
                            headers: {
                                'Content-Type': 'application/json',
                                appid: APP_ID,
                                appsecret: SECRET,
                            },
                            method: 'POST',
                            data: {
                                coin_type: coinType,
                            },
                        };
                        return [4 /*yield*/, axios_1.default('https://www.ddpurse.com/platform/openapi/v2/get_hosted_account', getHostedOptions)];
                    case 1:
                        res = _a.sent();
                        getHostedData = res.data;
                        if (log)
                            console.log('==============getHostedData==============', getHostedData);
                        if (getHostedData.code !== 0 || !getHostedData.data.address)
                            throw getHostedData;
                        returnData = getHostedData.data;
                        return [2 /*return*/, returnData];
                    case 2:
                        err_2 = _a.sent();
                        if (log)
                            console.log('==============err==============\n', err_2);
                        return [2 /*return*/, err_2];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
};
exports.hostedAccountBalance = function (APP_ID, SECRET) {
    return function (coinType, log) {
        if (coinType === void 0) { coinType = 'BSV'; }
        return __awaiter(void 0, void 0, void 0, function () {
            var getBalanceOptions, getBalance, getBalanceData, returnData, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        getBalanceOptions = {
                            headers: {
                                'Content-Type': 'application/json',
                                appid: APP_ID,
                                appsecret: SECRET,
                            },
                            method: 'POST',
                            data: {
                                coin_type: coinType,
                            },
                        };
                        return [4 /*yield*/, axios_1.default('https://www.ddpurse.com/platform/openapi/v2/get_hosted_account_balance', getBalanceOptions)];
                    case 1:
                        getBalance = _a.sent();
                        getBalanceData = getBalance.data;
                        if (log)
                            console.log('==============getBalanceData==============', getBalanceData);
                        if (getBalanceData.code !== 0 || !getBalanceData.data)
                            throw getBalanceData;
                        returnData = getBalanceData.data;
                        return [2 /*return*/, returnData];
                    case 2:
                        err_3 = _a.sent();
                        if (log)
                            console.log('==============err==============\n', err_3);
                        return [2 /*return*/, err_3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
};
