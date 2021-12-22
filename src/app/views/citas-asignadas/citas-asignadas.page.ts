import { Component, OnInit } from '@angular/core';
import { CitaService } from 'src/app/services/cita/cita.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-citas-asignadas',
  templateUrl: './citas-asignadas.page.html',
  styleUrls: ['./citas-asignadas.page.scss'],
})
export class CitasAsignadasPage implements OnInit {
  citas = [];
  aceptadas = []

  constructor(
    private citaService: CitaService,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.citaService.getCitasEstatus(this.auth.currentUserId, 'asignada').subscribe(data => {
      this.citas = data;
      for(var i = 0; i < data.length; i++) {
        console.log('citas', this.citas[i]);
        console.log(this.citas[i]['f_cita'])
        this.citas[i]['f_cita'] = moment(data[i]['f_cita'].seconds*1000).format('YYYY-MM-DD');
      }
    })
  }

  sweetAlert(data: any) {
    console.log('Dta', data);
    Swal.fire({
      icon: 'question',
      title: '¿Qué desea realizar con esta cita?',
      text: 'Seleccione la opcion a realizar con esta cita',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonColor: "#2fdf75",
      cancelButtonColor: "#ff496",
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Rechazar',
      cancelButtonText: 'Regresar',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Cita aceptada!', '', 'success')
        this.aceptarConsulta(data)
      } else if (result.isDenied) {
        Swal.fire('Cita rechzada', '', 'info');
        this.rechazarCita(data);
      }
    })
  }

  rechazarCita(data: any) {
    console.log('cancelarConsulta',data)
    Swal.fire({
      icon: 'question',
      title: '¿Desea rechazar esta consulta?',
      text: 'Ingrese el motivo por el cual rechazará esta consulta',
      showCancelButton: true,
      confirmButtonColor: "#2fdf75",
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      input: "text",
      inputValidator:motivo => {
          // Si el valor es válido, debes regresar undefined. Si no, una cadena
          if (!motivo) {
              return "Por favor escribe el motivo";
          } else {
              return undefined;
          }
      }
    }).then(resultado => {
        if (resultado.isConfirmed) {
          if(resultado.value){
            //console.log('Data sin modificar', data.extendedProps.currentCita);
            let dat = { motivo: resultado.value, idUser: this.auth.currentUserId, usuario: this.auth.dataUser.userName, accion: 'Rechazo', f_rechazo: new Date()}
            data.extendedProps.currentCita.historial.push(dat);
            var post = data.extendedProps.currentCita;
            post['estatus'] = 'rechazada';
            //console.log('Data modificada', post);
            this.citaService.updateCita(post);
          }
        }
    });
  }

  aceptarConsulta(data: any) {
    var post = data.extendedProps.currentCita;
    post['estatus'] = 'aceptada';
    this.citaService.updateCita(post);
  }

}
