import { Component, ElementRef, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea } from 'src/app/interfaces/Tarea.interface';
import { TareaService } from 'src/app/services/tarea.service';
import {DatePipe} from '@Angular/common';
import Swal from 'sweetalert2';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-registro-tarea',
  templateUrl: './registro-tarea.component.html',
  styleUrls: ['./registro-tarea.component.css'],
  providers: [DatePipe]
})
export class RegistroTareaComponent implements OnInit {
  //accion:FormControlName = this.fb.control('');
  idProyecto!:any;
  accion = 1;
  datos: Tarea [] = []; 
  nameProyecto!: string;
  nombreDesarrollador = this.fb.control('');
  miformulario: FormGroup = this.fb.group({
    idTarea: [''], //esto tiene que cambiar con el ID del servicio
    nombreTarea: ['', [Validators.required]],
    contenidoTarea:['', [Validators.required]],
    fechaRegistro:['', [Validators.required]],
    fechaFinaliza: ['', [Validators.required]],
    estado:['1',[Validators.required]],
    nameUser:this.fb.array([]),
  });

  limpiar(){
    this.miformulario.reset({
      idTarea:'',
      nombreTarea:'',
      contenidoTarea:'',
      fechaRegistro:'',
      fechaFinaliza:'',
      estado:'1',
    });
    this.gDeveloper.clear();
    this.nombreDesarrollador.reset();
  }

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private el: ElementRef,
    private srvTarea:TareaService,
    private activateoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    /* this.activateoute.params
    .subscribe((id) => {
      this.idProyecto=id['id'];
      this.getListartareas(id['id']);
    }) */
    this.activateoute.params.pipe(
      switchMap(({id}) => this.srvTarea.getObtenerProyectoID(id))
    ).subscribe(response => {
      console.log(response);
      this.idProyecto=response.idProyecto;
      this.getListartareas(this.idProyecto);
      this.nameProyecto = response.idProyecto;
    })
    
  }

  addTarea() {/* PARA HABILITAR EL FORM Y OCULTAR LAS TARJETAS*/
    let divtarjetas = this.el.nativeElement.querySelector('#tarjetas');
    let divformulario = this.el.nativeElement.querySelector('#formulario');
    let btnAgregar = this.el.nativeElement.querySelector('#btnagregar');
    divtarjetas.classList.add('none');
    divtarjetas.classList.remove('flex');
    divformulario.classList.remove('none');
    btnAgregar.classList.add('none');
    this.accion=1;
    this.limpiar();
    //this.miformulario.reset;
  }
  cancelar() {/*OCULTA EL FORM Y MUESTRA TARJETAS*/
    let divtarjetas = this.el.nativeElement.querySelector('#tarjetas');
    let divformulario = this.el.nativeElement.querySelector('#formulario');
    let btnAgregar = this.el.nativeElement.querySelector('#btnagregar');
    divformulario.classList.add('none');
    divtarjetas.classList.add('flex');
    divtarjetas.classList.remove('none');
    btnAgregar.classList.remove('none');   
  }

  editar(id:number){ /*LLAMAR AL SERVICIO PARA OBTENER LA TAREA SEGUN EL ID */
     this.addTarea();/*PARA OCULTAR TARJETAS Y HABILITAR FORM */
     this.accion=2;
     let pipe = new DatePipe('en-US');
    this.srvTarea.getListaTareaID(this.idProyecto,id).subscribe((rpt) => {
      console.log(pipe.transform(rpt.fechaRegistro,'dd/MM/yyy'));
      this.miformulario.controls['idTarea'].setValue(rpt.idTarea);
      this.miformulario.controls['nombreTarea'].setValue(rpt.nombreTarea);
      this.miformulario.controls['contenidoTarea'].setValue(rpt.contenidoTarea);
      this.miformulario.controls['estado'].setValue(rpt.estado);
      this.miformulario.controls['fechaRegistro'].setValue(pipe.transform(rpt.fechaRegistro,'yyyy-MM-dd'));
      this.miformulario.controls['fechaFinaliza'].setValue(rpt.fechaFinaliza); 
      for (let i = 0; i < rpt.usuarios.length; i++) {
        console.log(rpt.usuarios[i].nombre);
        
        this.gDeveloper.push(this.fb.control(rpt.usuarios[i].nombre));      
      }
    })
      
  }
  agregarTarea(){/* EL SERVICIO PARA GUARDAR TAREA EN BDD */
    if(this.accion == 1){
      this.srvTarea.getCrearTareas(this.idProyecto,this.miformulario.value)
    .subscribe((response)=>{
      Swal.fire(
        'Bien echo!',
        'Tarea registrado con exito.',
        'success'
      );
      this.limpiar();
      this.cancelar();
      this.getListartareas(this.idProyecto);
    },(e) => {
      if(e.status === 400){
        Swal.fire(
          'ALerta!',
          e.error.mensaje,
          'warning'
        );
      }
    })
    }else{
      Swal.fire({
        title: 'Esta seguro de editar esta Tarea?',
        text: "Una vez editada no podra recuperar los datos!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Modificar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.srvTarea.putEditarTarea(this.idProyecto,this.miformulario.controls['idTarea'].value,this.miformulario.value)
          .subscribe((response)=>{
            Swal.fire(
              'Bien echo!',
              'La Tarea fue modificaca con exito.',
              'success'
            );
          this.limpiar();
            this.cancelar();
            this.getListartareas(this.idProyecto);
          },(e) => {
            if(e.status === 400){
              Swal.fire(
                'ALerta!',
                e.error.mensaje,
                'warning'
              );
            }
          })
          
        }
      })

    }
    
  }

  eliminar(id:number){

    Swal.fire({
      title: 'Estas segro de Eliminar?',
      text: "Una vez eliminada no podra recuperar este registro!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvTarea.getEliminarTarea(this.idProyecto,id).subscribe((rpt)=>{          
          console.log(rpt);
          
        },(e)=>{
          if(e.status === 400){
            Swal.fire(
              'ALerta!',
              e.error.mensaje,
              'warning'
            );  
          }      
         if(e.status === 200){
          this.getListartareas(this.idProyecto);
          Swal.fire(
            'Bien echo!',
            'Tarea eliminada con exito.',
            'success'
          );
         }
        });      
        
      }
    })
  
  }

  getListartareas(idTarea:number){
    this.srvTarea.getListarTareas(idTarea)
    .subscribe((response) => {
      this.datos = response;
      console.log(response);
    },(e) => {
      if(e.status === 400){
        Swal.fire(
          'ALerta!',
          e.error.mensaje,
          'warning'
        );
      }
    })
  }

  get gDeveloper(): FormArray {
    return this.miformulario.get('nameUser') as FormArray;
  }
  addDev(item:string) {
    if(item == null || item == ''){
      return;
    }
    this.gDeveloper.push(this.fb.control(item));
    this.nombreDesarrollador.reset();
  }

 
}
