"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConsultaPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var consulta_routing_module_1 = require("./consulta-routing.module");
var consulta_page_1 = require("./consulta.page");
var input_1 = require("@angular/material/input");
var header_component_1 = require("../componentes/header/header.component");
var ConsultaPageModule = /** @class */ (function () {
    function ConsultaPageModule() {
    }
    ConsultaPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                consulta_routing_module_1.ConsultaPageRoutingModule,
                forms_1.ReactiveFormsModule,
                input_1.MatInputModule
            ],
            declarations: [consulta_page_1.ConsultaPage, header_component_1.HeaderComponent]
        })
    ], ConsultaPageModule);
    return ConsultaPageModule;
}());
exports.ConsultaPageModule = ConsultaPageModule;
