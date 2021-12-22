"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CitasAceptadasPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var citas_aceptadas_routing_module_1 = require("./citas-aceptadas-routing.module");
var citas_aceptadas_page_1 = require("./citas-aceptadas.page");
var menu_component_1 = require("../componentes/menu/menu.component");
var header_component_1 = require("../componentes/header/header.component");
var expansion_1 = require("@angular/material/expansion");
var CitasAceptadasPageModule = /** @class */ (function () {
    function CitasAceptadasPageModule() {
    }
    CitasAceptadasPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                citas_aceptadas_routing_module_1.CitasAceptadasPageRoutingModule,
                expansion_1.MatExpansionModule
            ],
            declarations: [citas_aceptadas_page_1.CitasAceptadasPage, menu_component_1.MenuComponent, header_component_1.HeaderComponent]
        })
    ], CitasAceptadasPageModule);
    return CitasAceptadasPageModule;
}());
exports.CitasAceptadasPageModule = CitasAceptadasPageModule;
