"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var angular_1 = require("@ionic/angular");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var compat_1 = require("@angular/fire/compat");
var auth_1 = require("@angular/fire/compat/auth");
var firestore_1 = require("@angular/fire/compat/firestore");
var environment_1 = require("../environments/environment");
var animations_1 = require("@angular/platform-browser/animations");
var input_1 = require("@angular/material/input");
var grid_list_1 = require("@angular/material/grid-list");
var expansion_1 = require("@angular/material/expansion");
var ngx_1 = require("@awesome-cordova-plugins/call-number/ngx");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [app_component_1.AppComponent,],
            entryComponents: [],
            imports: [
                platform_browser_1.BrowserModule,
                angular_1.IonicModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                compat_1.AngularFireModule.initializeApp(environment_1.environment.firebaseConfig),
                firestore_1.AngularFirestoreModule,
                auth_1.AngularFireAuthModule,
                animations_1.BrowserAnimationsModule,
                input_1.MatInputModule,
                grid_list_1.MatGridListModule,
                expansion_1.MatExpansionModule,
            ],
            providers: [ngx_1.CallNumber, { provide: router_1.RouteReuseStrategy, useClass: angular_1.IonicRouteStrategy }],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
