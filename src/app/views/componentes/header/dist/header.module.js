"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var header_component_1 = require("./header.component");
var HeaderModule = /** @class */ (function () {
    function HeaderModule() {
    }
    HeaderModule.rootComponent = header_component_1.HeaderComponent;
    HeaderModule = __decorate([
        core_1.NgModule({
            declarations: [header_component_1.HeaderComponent],
            exports: [header_component_1.HeaderComponent],
            entryComponents: [header_component_1.HeaderComponent],
            imports: [
                common_1.CommonModule
            ]
        })
    ], HeaderModule);
    return HeaderModule;
}());
exports.HeaderModule = HeaderModule;
