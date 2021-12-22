import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(
    private afs: AngularFirestore
  ) { }

  crearConsulta(post: any) {
    console.log('PostConsulta', post.consulta_cita_idHorario)
    return new Promise<void>((resolve) => {
      const fecha = new Date()
      post['f_consulta'] = fecha;
      post['fecha_consulta'] = moment(fecha).format('yyyy-mm-dd');
      post['id'] = this.afs.createId();
      post['consulta_pac_nombre_completo'] = post['consulta_pac_nombre'] + ' ' + post['consulta_paciente_primer_apellido'] + ' ' + post['consulta_paciente_segundo_apellido']
      console.log('POST', post)
      this.afs.doc('/SegMedico/peregrino/Consultas/' + post['id']).set(post).then(() => {
        resolve();
      })
    })
  }
}
