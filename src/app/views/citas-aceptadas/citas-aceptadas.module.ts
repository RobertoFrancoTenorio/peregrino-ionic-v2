import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CitasAceptadasPageRoutingModule } from './citas-aceptadas-routing.module';

import { CitasAceptadasPage } from './citas-aceptadas.page';
import { MenuComponent } from '../componentes/menu/menu.component';
import { HeaderComponent } from '../componentes/header/header.component'

import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CitasAceptadasPageRoutingModule,
    MatExpansionModule
  ],
  declarations: [CitasAceptadasPage, MenuComponent, HeaderComponent]
})
export class CitasAceptadasPageModule {}
