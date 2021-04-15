"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const core_1 = require("@angular/core");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const environment_1 = require("../../../environments/environment");
let AuthService = class AuthService {
    constructor(http, jwtHelper) {
        this.http = http;
        this.jwtHelper = jwtHelper;
        this.token = null;
    }
    login(user) {
        return this.http.post(`${environment_1.environment.url}/user/auth`, user);
    }
    setToken(token) {
        this.token = token;
    }
    getToken() {
        return this.token;
    }
    isAuthenticatedUser() {
        return !!this.token;
    }
    logout() {
        this.setToken(null);
        localStorage.clear();
    }
    decryptToken() {
        const token = localStorage.getItem('access-token');
        const tokenEncrypt = jwt_decode_1.default(token);
        return tokenEncrypt.username;
    }
};
AuthService = __decorate([
    core_1.Injectable({
        providedIn: 'root'
    })
], AuthService);
exports.AuthService = AuthService;
