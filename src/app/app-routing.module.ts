import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComentarioComponent } from './components/registro-comentario/registro-comentario.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"inicio", component:IndexComponent},
  {path:"register_user", component:RegistroUsuarioComponent},
  {path:"**", redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
