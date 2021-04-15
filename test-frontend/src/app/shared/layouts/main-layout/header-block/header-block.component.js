"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeaderBlockComponent = void 0;
const core_1 = require("@angular/core");
let HeaderBlockComponent = class HeaderBlockComponent {
    constructor(authService, router, toastrService) {
        this.authService = authService;
        this.router = router;
        this.toastrService = toastrService;
    }
    ngOnInit() {
        this.username = this.authService.decryptToken();
        console.log(this.username);
    }
    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
        this.toastrService.success('Exit confirmed');
    }
};
HeaderBlockComponent = __decorate([
    core_1.Component({
        selector: 'app-header-block',
        templateUrl: './header-block.component.html',
        styleUrls: ['./header-block.component.css']
    })
], HeaderBlockComponent);
exports.HeaderBlockComponent = HeaderBlockComponent;
