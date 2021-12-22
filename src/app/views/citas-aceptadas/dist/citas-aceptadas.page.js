"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CitasAceptadasPage = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var moment = require("moment");
var CitasAceptadasPage = /** @class */ (function () {
    function CitasAceptadasPage(citaService, auth, router, paciente, call) {
        this.citaService = citaService;
        this.auth = auth;
        this.router = router;
        this.paciente = paciente;
        this.call = call;
        this.citas = [];
        this.arrayFechas = [];
        this.arrayCitas = [];
    }
    CitasAceptadasPage.prototype.ngOnInit = function () {
        var _this = this;
        this.citaService.getCitasEstatus(this.auth.currentUserId, 'aceptada').subscribe(function (data) {
            _this.citas = data;
            _this.detPaciente = data[0]['extendedProps'].currentCita.detPaciente;
            //console.log('Citas', this.citas[0].extendedProps.currentCita.comentarios)
            for (var i = 0; i < data.length; i++) {
                _this.paciente.getPacienteData(_this.citas[i].extendedProps.currentCita.detPaciente.id).subscribe(function (data) {
                    _this.currentPaciente = data;
                });
                _this.citas[i]['f_cita'] = moment(data[i]['f_cita'].seconds * 1000).format('YYYY-MM-DD');
                _this.arrayFechas.push(_this.citas[i]['f_cita']);
                _this.arrayCitas = _this.arrayFechas.filter(_this.onlyUnique);
                console.log('Unique', _this.arrayCitas);
            }
        });
    };
    CitasAceptadasPage.prototype.realizarConsulta = function (cita) {
        var _this = this;
        sweetalert2_1["default"].fire({
            icon: 'question',
            title: '¿Desea realizar esta consulta?',
            text: '¿Obtuvo respuesta del paciente?',
            footer: '<ion-icon style="color: red" name="fitness-outline"></ion-icon>',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: "#2fdf75",
            cancelButtonColor: "#ff4961",
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.goToConsulta(cita.extendedProps.currentCita);
            }
            else if (result.isDenied) {
            }
        });
    };
    CitasAceptadasPage.prototype.goToConsulta = function (data) {
        var navigationExtras = {
            state: {
                infoCita: data,
                paciente: this.currentPaciente
            }
        };
        this.router.navigate(['consulta'], navigationExtras);
    };
    CitasAceptadasPage.prototype.onlyUnique = function (value, index, self) {
        return self.indexOf(value) === index;
    };
    CitasAceptadasPage.prototype.realizarLlamada = function (telefono, cita) {
        var _this = this;
        console.log("Llamando a ...", telefono);
        this.call.callNumber(telefono, true).then(function () {
            console.log("Llamada Exitosa");
        })["catch"](function () {
            console.log("Error al intentar llamar");
        });
        sweetalert2_1["default"].fire({
            icon: 'question',
            title: 'Llamando...',
            text: '¿Obtuvo respuesta?',
            showDenyButton: true,
            confirmButtonText: 'Si',
            denyButtonText: 'No'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.goToConsulta(cita);
            }
            else if (result.isDenied) {
                var data = { motivo: 'No se obtuvo respuesta', idUser: _this.auth.currentUserId, usuario: _this.auth.dataUser.userName, accion: 'Reagendar', f_termino: new Date() };
                cita.extendedProps.currentCita.estatus = 'reagendar';
                cita.extendedProps.currentCita.historial.push(data);
                _this.citaService.updateCita(cita.extendedProps.currentCita);
                _this.router.navigate(['home']);
                //console.log('Cita', cita.extendedProps.currentCita)
            }
        });
    };
    CitasAceptadasPage = __decorate([
        core_1.Component({
            selector: 'app-citas-aceptadas',
            templateUrl: './citas-aceptadas.page.html',
            styleUrls: ['./citas-aceptadas.page.scss']
        })
    ], CitasAceptadasPage);
    return CitasAceptadasPage;
}());
exports.CitasAceptadasPage = CitasAceptadasPage;
