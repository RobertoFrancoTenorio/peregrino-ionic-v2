"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConsultaService = void 0;
var core_1 = require("@angular/core");
var moment = require("moment");
var ConsultaService = /** @class */ (function () {
    function ConsultaService(afs) {
        this.afs = afs;
    }
    ConsultaService.prototype.crearConsulta = function (post) {
        var _this = this;
        console.log('PostConsulta', post.consulta_cita_idHorario);
        return new Promise(function (resolve) {
            var fecha = new Date();
            post['f_consulta'] = fecha;
            post['fecha_consulta'] = moment(fecha).format('yyyy-mm-dd');
            post['id'] = _this.afs.createId();
            post['consulta_pac_nombre_completo'] = post['consulta_pac_nombre'] + ' ' + post['consulta_paciente_primer_apellido'] + ' ' + post['consulta_paciente_segundo_apellido'];
            console.log('POST', post);
            _this.afs.doc('/SegMedico/peregrino/Consultas/' + post['id']).set(post).then(function () {
                resolve();
            });
        });
    };
    ConsultaService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ConsultaService);
    return ConsultaService;
}());
exports.ConsultaService = ConsultaService;
