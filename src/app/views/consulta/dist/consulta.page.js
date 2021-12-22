"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.__esModule = true;
exports.ConsultaPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var moment = require("moment");
var sweetalert2_1 = require("sweetalert2");
var ConsultaPage = /** @class */ (function () {
    function ConsultaPage(router, route, fb, auth, citaService, consultaService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.fb = fb;
        this.auth = auth;
        this.citaService = citaService;
        this.consultaService = consultaService;
        this.currentFecha = new Date();
        this.running = false;
        this.startText = "Start";
        console.log('CurrentCita', this.router.getCurrentNavigation().extras.state.paciente);
        if (this.router.getCurrentNavigation() != null) {
            this.route.queryParams.subscribe(function (params) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (this.router.getCurrentNavigation().extras.state) {
                        this.currentCita = this.router.getCurrentNavigation().extras.state.infoCita.extendedProps.currentCita;
                        this.currentPaciente = this.router.getCurrentNavigation().extras.state.paciente;
                    }
                    return [2 /*return*/];
                });
            }); });
        }
        else {
            this.currentCita = null;
        }
    }
    ConsultaPage.prototype.ngOnInit = function () {
        //console.log('CurrentPaciente', this.currentPaciente)
        this.consultaForm = this.fb.group({
            /*consulta_pac_nombre: this.currentCita.detPaciente.nombre,
            consulta_paciente_primer_apellido: this.currentPaciente.pac_primer_apellido,
            consulta_paciente_segundo_apellido: this.currentPaciente.pac_segundo_apellido,
            consulta_pac_email: this.currentPaciente.pac_email,
            consulta_pac_telefono: this.currentPaciente.pac_telefono,
            consulta_pac_celular: this.currentPaciente.pac_celular,*/
            consulta_presion_arterial: [''],
            consulta_frec_cardiaca: [''],
            consulta_frec_respiratoria: [''],
            consulta_temp: [''],
            consulta_nota_medica: ['', forms_1.Validators.required],
            consulta_diagnostico: ['', forms_1.Validators.required],
            consulta_tratamiento: ['', forms_1.Validators.required]
        });
        this.hora_inicio = new Date();
        this.startTimer();
    };
    ConsultaPage.prototype.enviarConsulta = function () {
        var _this = this;
        console.log('CurrentCita', this.currentCita);
        var data = { motivo: 'Cita finalizada', idUser: this.auth.currentUserId, usuario: this.auth.dataUser.userName, accion: 'Terminada', f_termino: new Date() };
        this.currentCita.estatus = 'terminada';
        this.currentCita.historial.push(data);
        this.hora_fin = new Date();
        var duracion = (this.hora_fin - this.hora_inicio) / 1000;
        duracion = duracion / 60;
        var post = this.consultaForm.value;
        post['consulta_paciente_primer_apellido'] = this.currentPaciente.pac_primer_apellido,
            post['consulta_paciente_segundo_apellido'] = this.currentPaciente.pac_segundo_apellido,
            post['consulta_pac_email'] = this.currentPaciente.pac_email,
            post['consulta_pac_telefono'] = this.currentPaciente.pac_telefono,
            post['consulta_pac_celular'] = this.currentPaciente.pac_celular,
            post['consulta_id_paciente'] = this.currentPaciente.id;
        post['id_Doctor'] = this.auth.currentUserId;
        post['consulta_hora_inicio'] = moment(this.hora_inicio).format('hh:mm:ss');
        post['consulta_hora_fin'] = moment(this.hora_fin).format('hh:mm:ss');
        post['consulta_cita_idHorario'] = this.currentCita.idHorario;
        var dur = duracion.toString();
        post['duracion'] = dur.substring(0, 4) + ' ' + 'minutos';
        sweetalert2_1["default"].fire({
            title: 'Consulta terminada',
            text: "La consulta ha sido guardada",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#01226',
            confirmButtonText: 'Continuar'
        }).then(function () {
            _this.consultaForm.reset();
            console.log('Consulta', post);
            console.log('Cita', _this.currentCita);
            _this.consultaService.crearConsulta(post);
            _this.citaService.updateCita(_this.currentCita);
            _this.router.navigate(['home']);
        });
    };
    ConsultaPage.prototype.startTimer = function () {
        var _this = this;
        this.running = !this.running;
        if (this.running) {
            this.startText = "Stop";
            var startTime_1 = Date.now() - (this.counter || 0);
            this.timerRef = setInterval(function () {
                _this.counter = Date.now() - startTime_1;
                // var ms = 298999;
                _this.minutos = _this.counter / 1000 / 60;
                _this.horas = _this.minutos % 1;
                _this.segundo = Math.floor(_this.horas * 60);
                if (_this.segundo < 10) {
                    _this.segundo = "0" + _this.segundo;
                }
                _this.minutos = Math.floor(_this.minutos);
                _this.cronometro = _this.minutos + ":" + _this.segundo;
            });
        }
        else {
            this.startText = "Resume";
            clearInterval(this.timerRef);
        }
    };
    ConsultaPage.prototype.goToHome = function () {
        this.router.navigate(['citas-aceptadas']);
    };
    ConsultaPage = __decorate([
        core_1.Component({
            selector: 'app-consulta',
            templateUrl: './consulta.page.html',
            styleUrls: ['./consulta.page.scss']
        })
    ], ConsultaPage);
    return ConsultaPage;
}());
exports.ConsultaPage = ConsultaPage;
