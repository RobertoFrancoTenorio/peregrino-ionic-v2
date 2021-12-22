import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConsultaPageRoutingModule } from './consulta-routing.module';

import { ConsultaPage } from './consulta.page';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../componentes/header/header.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConsultaPageRoutingModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [ConsultaPage, HeaderComponent]
})
export class ConsultaPageModule {}
