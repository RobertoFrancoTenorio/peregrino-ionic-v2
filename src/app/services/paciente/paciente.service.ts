import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
  ) { }

  getPacienteData(id:string) {
    //return this.afs.doc('/SegMedico/peregrino/Pacientes/'+id).valueChanges();
    return this.afs.doc('/SegMedico/peregrino/Pacientes/'+id).valueChanges()
  }
}
