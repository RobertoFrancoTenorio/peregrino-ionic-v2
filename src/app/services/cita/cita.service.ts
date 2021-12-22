import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(
    private afs: AngularFirestore,
    public auth: AuthService,
  ) { }

  getPacienteData(id:string) {
    //return this.afs.doc('/SegMedico/peregrino/Pacientes/'+id).valueChanges();
    return this.afs.doc('/SegMedico/peregrino/Pacientes/'+id).valueChanges()
  }

  getCitasAsignadasDoctor(id: string){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
    ref.where('detDoctor.id', '==', id,).where('estatus', '==', 'asignada')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data()
        var fecha = data['f_cita']
        var horaInicio = data['cita_hora_fin']+'00'
        let evento = {};
        evento = {
          title: data['detPaciente'].nombre,
          start: fecha,
          hora: horaInicio
        }
        return evento
      }))
    )
  }


  getCitasDoctor(id: string){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref.where('detDoctor.id', '==', id)).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          var color = ' '
            var background = ' '
            const data = a.payload.doc.data()
            var start = data['f_cita']
            //const ini = this.DatePipe.transform(start.toDate(), 'yyyy-MM-dd').toString()
            const horaInicio = data['cita_hora_ini']+':00'

            var end = data['f_cita']
            //const fin = this.DatePipe.transform(end.toDate(), 'yyyy-MM-dd').toString()
            const horaFin = data['cita_hora_fin']+':00'
            let evento = {};

            if(data['estatus'] != 'rechazada'){
              if(data['estatus'] != 'reagendar'){
                if(data['estatus'] != 'terminada'){
                  evento = {
                    title: data['detPaciente'].nombre,
                    //start: ini+'T'+horaInicio,
                    //end: fin+'T'+horaFin,
                    //textColor: background,
                    color: color,
                    estatus: data['estatus'],
                    f_cita: data['f_cita'],
                    extendedProps: {
                      tipoEvento: 'Cita',
                      currentCita: data,
                    }
                  };
                }
              }
            }
            return evento
        }))
      )
  }

  getCitasEstatus(id: string, estatus: string){
    return this.afs.collection('/SegMedico/peregrino/citas', ref =>
      ref.where('detDoctor.id', '==', id).where('estatus', '==', estatus).orderBy('f_cita', 'asc')).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          var color = ' '
            var background = ' '
            const data = a.payload.doc.data()
            let evento = {};
            evento = {
              title: data['detPaciente'].nombre,
              start: data['cita_hora_ini']+':00',
              end: data['cita_hora_fin']+':00',
              estatus: data['estatus'],
              f_cita: data['f_cita'],
              extendedProps: {
                tipoEvento: 'Cita',
                currentCita: data,
            }
          }
          return evento
        }))
      )
  }

  updateCita(post: any) {
    console.log('POST', post)
    return new Promise<void>((resolve) => {
      this.afs.doc('SegMedico/peregrino/citas/' + post['id']).update(post).then(() => {
        resolve()
      })
    })
  }
}
