import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
//import { User, auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { Observable, Subject, from } from 'rxjs';

import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: firebase.User;
  dataUser: any;
  userProviderAdditionalInfo: any;
  redirectResult: Subject<any> = new Subject<any>();
  currentRole:string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.afAuth.onAuthStateChanged(async (user) => {
      if (user!=null) {
        this.currentUser = user;
        await this.getUserData();
        //this.router.navigate(['/pages']);
      } else {

      }
    })
  }

  userDetails() {
    return this.afAuth.user
  }

  async getUserData() {
    return new Promise(resolve => {
        this.afs.doc('SegMedico/peregrino/usuarios/' + this.currentUserId).valueChanges().subscribe(data => {
          if(data){
            this.dataUser = data;
            resolve('success');
          }else{
            this.signOut();
            resolve('error');
          }
        });
    });
  }

  get isLoggedIn(): boolean {
    return this.currentUser !== undefined;
  }

  get currentUserId(): string {
    return this.isLoggedIn ? this.currentUser.uid : '';
  }

  getLoggedInUser() {
    return this.currentUser;
  }

  signOut(): Observable<any> {
    return from(this.afAuth.signOut().then(() => {
      this.router.navigate(['login'], { replaceUrl: true });

    }));
  }

  signInWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(
        res => {
          resolve(res),
          //this.authenticationState.next(true)
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        },
        err => reject(err))
    })
  }
}

export class ProfileModel {
  image: string;
  name: string;
  role: string;
  description: string;
  email: string;
  provider: string;
  phoneNumber: string;
}
