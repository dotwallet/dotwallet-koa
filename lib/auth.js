"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.refreshAccess = exports.handleAuthResponse = void 0;
var axios_1 = require("axios");
var url = require("url");
exports.handleAuthResponse = function (APP_ID, SECRET) {
    return function (ctx, next, redirectWithQueries, log) { return __awaiter(void 0, void 0, void 0, function () {
        var code, data, accessTokenRequest, accessData, userInfoRequest, userData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    code = ctx.request.query.code;
                    if (log)
                        console.log('==============got code==============\n', code);
                    data = {
                        app_id: APP_ID,
                        secret: SECRET,
                        code: code,
                    };
                    if (log)
                        console.log('==============submitting token request data==============\n', data);
                    return [4 /*yield*/, axios_1.default.post('https://www.ddpurse.com/platform/openapi/access_token', data)];
                case 1:
                    accessTokenRequest = _a.sent();
                    if (log)
                        console.log('==============access token result==============\n', accessTokenRequest.data);
                    if (accessTokenRequest.data.code !== 0)
                        throw accessTokenRequest;
                    accessData = accessTokenRequest.data.data;
                    if (!accessData.access_token) return [3 /*break*/, 3];
                    return [4 /*yield*/, axios_1.default.get('https://www.ddpurse.com/platform/openapi/get_user_info?access_token=' + accessData.access_token)];
                case 2:
                    userInfoRequest = _a.sent();
                    if (log)
                        console.log('==============user info result==============\n', userInfoRequest.data);
                    if (userInfoRequest.data.code !== 0)
                        throw userInfoRequest;
                    userData = userInfoRequest.data.data;
                    if (redirectWithQueries)
                        ctx.response.redirect(url.format({
                            pathname: redirectWithQueries,
                            query: __assign({}, userData),
                        }));
                    return [2 /*return*/, { userData: userData, accessData: accessData }];
                case 3: throw accessTokenRequest;
                case 4: return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    console.warn('==============ERROR==============\n', err_1);
                    next();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
};
exports.refreshAccess = function (APP_ID) {
    return function (refreshToken) { return __awaiter(void 0, void 0, void 0, function () {
        var response, accessData, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios_1.default.get("https://www.ddpurse.com/platform/openapi/refresh_access_token?app_id=" + APP_ID + "&refresh_token=" + refreshToken)];
                case 1:
                    response = _a.sent();
                    console.log('==============refresh response==============\n', response.data.data);
                    if (response.data.code !== 0)
                        throw response;
                    accessData = response.data.data;
                    return [2 /*return*/, accessData];
                case 2:
                    err_2 = _a.sent();
                    console.warn('==============ERROR==============\n', err_2);
                    return [2 /*return*/, err_2];
                case 3: return [2 /*return*/];
            }
        });
    }); };
};
