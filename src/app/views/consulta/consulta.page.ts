import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import {AuthService} from 'src/app/services/auth/auth.service';
import {CitaService} from 'src/app/services/cita/cita.service';
import Swal from 'sweetalert2'
import { ConsultaService } from 'src/app/services/consulta/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
})
export class ConsultaPage implements OnInit {
  currentCita: any;
  currentPaciente: any;
  consultaForm: FormGroup;
  currentFecha = new Date();
  fechaHoy;
  hora_inicio: any;
  hora_fin: any;
  counter: number;
  segundo: any;
  minutos: any;
  horas: any;
  cronometro: any;
  timerRef;
  running: boolean = false;
  startText = "Start";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private citaService: CitaService,
    private consultaService: ConsultaService
  ) {
    console.log('CurrentCita', this.router.getCurrentNavigation().extras.state.paciente);
    if(this.router.getCurrentNavigation() != null){
      this.route.queryParams.subscribe(async params =>{
        if(this.router.getCurrentNavigation().extras.state){
          this.currentCita = this.router.getCurrentNavigation().extras.state.infoCita.extendedProps.currentCita;
          this.currentPaciente = this.router.getCurrentNavigation().extras.state.paciente;
        }
      })
    }
    else{
      this.currentCita = null;
    }
  }

  ngOnInit() {
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
      consulta_nota_medica: ['', Validators.required],
      consulta_diagnostico: ['', Validators.required],
      consulta_tratamiento: ['', Validators.required],
    })
    this.hora_inicio = new Date();
    this.startTimer();
  }

  enviarConsulta(){
    console.log('CurrentCita', this.currentCita);

    let data = { motivo: 'Cita finalizada', idUser: this.auth.currentUserId, usuario: this.auth.dataUser.userName, accion: 'Terminada', f_termino: new Date()}
    this.currentCita.estatus= 'terminada';
    this.currentCita.historial.push(data);
    this.hora_fin = new Date();
    var duracion = (this.hora_fin - this.hora_inicio)/1000;
    duracion = duracion /60;

    let post = this.consultaForm.value
    post['consulta_paciente_primer_apellido'] = this.currentPaciente.pac_primer_apellido,
    post['consulta_paciente_segundo_apellido']= this.currentPaciente.pac_segundo_apellido,
    post['consulta_pac_email']= this.currentPaciente.pac_email,
    post['consulta_pac_telefono']= this.currentPaciente.pac_telefono,
    post['consulta_pac_celular']= this.currentPaciente.pac_celular,
    post['consulta_id_paciente'] = this.currentPaciente.id;
    post['id_Doctor'] = this.auth.currentUserId;
    post['consulta_hora_inicio'] = moment(this.hora_inicio).format('hh:mm:ss');
    post['consulta_hora_fin'] = moment(this.hora_fin).format('hh:mm:ss');
    post['consulta_cita_idHorario'] = this.currentCita.idHorario;
    var dur = duracion.toString();
    post['duracion'] = dur.substring(0, 4) + ' ' + 'minutos'

    Swal.fire({
      title: 'Consulta terminada',
      text: "La consulta ha sido guardada",
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#01226',
      confirmButtonText: 'Continuar'
    }).then(() => {
      this.consultaForm.reset();
      console.log('Consulta', post);
      console.log('Cita', this.currentCita)
      this.consultaService.crearConsulta(post);
      this.citaService.updateCita(this.currentCita);
      this.router.navigate(['home']);
    })

  }

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = "Stop";
      const startTime = Date.now() - (this.counter || 0);
      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
        // var ms = 298999;
        this.minutos = this.counter / 1000 / 60;
        this.horas = this.minutos % 1;
        this.segundo = Math.floor(this.horas * 60);
        if (this.segundo < 10) {
          this.segundo = "0" + this.segundo;
        }
        this.minutos = Math.floor(this.minutos);
        this.cronometro = this.minutos + ":" + this.segundo;
      });
    } else {
      this.startText = "Resume";
      clearInterval(this.timerRef);
    }
  }

  goToHome(){
    this.router.navigate(['citas-aceptadas']);
  }

}
