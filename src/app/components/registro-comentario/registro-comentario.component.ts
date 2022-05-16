import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Comentario } from 'src/app/models/comentario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-comentario',
  templateUrl: './registro-comentario.component.html',
  styleUrls: ['./registro-comentario.component.css']
})
export class RegistroComentarioComponent implements OnInit {

  @ViewChild("modalBodyItems") modalcomentario:any;

  comentario:string="";
  codeTask:number=0;

  listadoComentarios:Comentario[]=[];

  constructor() { }

  loadComentarios(code:number){

    console.log(code);

    this.comentario="";
    this.codeTask=code;
    this.listadoComentarios=[];
    
    this.listadoComentarios=[{
      "id_comentario": 1,
      "contenido_comentario": "Fracture of unspecified part of unspecified clavicle, subsequent encounter for fracture with malunion",
      "fecha_comentario": "2021-06-13",
      "id_usuario": 2,
      "ip_tarea": 1
    }, {
      "id_comentario": 2,
      "contenido_comentario": "Other injury of ureter",
      "fecha_comentario": "2020-12-01",
      "id_usuario": 1,
      "ip_tarea": 1
    }, {
      "id_comentario": 3,
      "contenido_comentario": "Blister (nonthermal), left ankle, sequela",
      "fecha_comentario": "2021-06-16",
      "id_usuario": 8,
      "ip_tarea": 1
    }, {
      "id_comentario": 4,
      "contenido_comentario": "Superficial foreign body of scrotum and testes, subsequent encounter",
      "fecha_comentario": "2021-09-15",
      "id_usuario": 11,
      "ip_tarea": 1
    }, {
      "id_comentario": 5,
      "contenido_comentario": "Superficial frostbite of left toe(s), subsequent encounter",
      "fecha_comentario": "2021-01-07",
      "id_usuario": 3,
      "ip_tarea": 1
    }, {
      "id_comentario": 6,
      "contenido_comentario": "Car driver injured in collision with two- or three-wheeled motor vehicle in nontraffic accident, subsequent encounter",
      "fecha_comentario": "2021-06-27",
      "id_usuario": 4,
      "ip_tarea": 1
    }, {
      "id_comentario": 7,
      "contenido_comentario": "Corrosion of first degree of unspecified thigh, subsequent encounter",
      "fecha_comentario": "2022-04-09",
      "id_usuario": 7,
      "ip_tarea": 1
    }, {
      "id_comentario": 8,
      "contenido_comentario": "Unspecified injury of left vertebral artery, subsequent encounter",
      "fecha_comentario": "2020-09-27",
      "id_usuario": 6,
      "ip_tarea": 1
    }, {
      "id_comentario": 9,
      "contenido_comentario": "Displaced fracture of medial phalanx of left index finger, subsequent encounter for fracture with delayed healing",
      "fecha_comentario": "2020-12-17",
      "id_usuario": 3,
      "ip_tarea": 1
    }, {
      "id_comentario": 10,
      "contenido_comentario": "Unstable burst fracture of second thoracic vertebra, initial encounter for open fracture",
      "fecha_comentario": "2020-04-19",
      "id_usuario": 10,
      "ip_tarea": 1
    }, {
      "id_comentario": 11,
      "contenido_comentario": "Personal history of drug therapy",
      "fecha_comentario": "2021-05-19",
      "id_usuario": 9,
      "ip_tarea": 1
    }, {
      "id_comentario": 12,
      "contenido_comentario": "Adverse effect of cardiac-stimulant glycosides and drugs of similar action, initial encounter",
      "fecha_comentario": "2020-06-01",
      "id_usuario": 12,
      "ip_tarea": 1
    }, {
      "id_comentario": 13,
      "contenido_comentario": "Other central nervous system complications of anesthesia during pregnancy, second trimester",
      "fecha_comentario": "2020-09-01",
      "id_usuario": 8,
      "ip_tarea": 1
    }, {
      "id_comentario": 14,
      "contenido_comentario": "Other hang-glider accident injuring occupant, initial encounter",
      "fecha_comentario": "2020-08-02",
      "id_usuario": 5,
      "ip_tarea": 1
    }, {
      "id_comentario": 15,
      "contenido_comentario": "Laceration of muscle, fascia and tendon of unspecified hip, subsequent encounter",
      "fecha_comentario": "2020-07-01",
      "id_usuario": 11,
      "ip_tarea": 1
    }, {
      "id_comentario": 16,
      "contenido_comentario": "Other chronic hematogenous osteomyelitis, shoulder",
      "fecha_comentario": "2020-05-22",
      "id_usuario": 9,
      "ip_tarea": 1
    }, {
      "id_comentario": 17,
      "contenido_comentario": "Burn due to merchant ship on fire, initial encounter",
      "fecha_comentario": "2021-12-05",
      "id_usuario": 5,
      "ip_tarea": 1
    }, {
      "id_comentario": 18,
      "contenido_comentario": "Glaucoma secondary to other eye disorders, bilateral, mild stage",
      "fecha_comentario": "2021-04-21",
      "id_usuario": 3,
      "ip_tarea": 1
    }, {
      "id_comentario": 19,
      "contenido_comentario": "Laceration of other specified blood vessels at shoulder and upper arm level, unspecified arm, subsequent encounter",
      "fecha_comentario": "2020-04-01",
      "id_usuario": 7,
      "ip_tarea": 1
    }, {
      "id_comentario": 20,
      "contenido_comentario": "Age-related osteoporosis with current pathological fracture, unspecified site, subsequent encounter for fracture with nonunion",
      "fecha_comentario": "2021-10-25",
      "id_usuario": 5,
      "ip_tarea": 1
    }, {
      "id_comentario": 21,
      "contenido_comentario": "Unspecified foreign body in bronchus causing asphyxiation, subsequent encounter",
      "fecha_comentario": "2020-10-31",
      "id_usuario": 11,
      "ip_tarea": 1
    }, {
      "id_comentario": 22,
      "contenido_comentario": "Unspecified injury at C8 level of cervical spinal cord, subsequent encounter",
      "fecha_comentario": "2021-03-11",
      "id_usuario": 2,
      "ip_tarea": 1
    }, {
      "id_comentario": 23,
      "contenido_comentario": "Non-in- line roller-skate accident",
      "fecha_comentario": "2022-04-22",
      "id_usuario": 12,
      "ip_tarea": 1
    }, {
      "id_comentario": 24,
      "contenido_comentario": "Synovial hypertrophy, not elsewhere classified, right thigh",
      "fecha_comentario": "2020-11-13",
      "id_usuario": 5,
      "ip_tarea": 1
    }, {
      "id_comentario": 25,
      "contenido_comentario": "Other contact with other nonvenomous reptiles, sequela",
      "fecha_comentario": "2020-09-14",
      "id_usuario": 11,
      "ip_tarea": 1
    }];

    this.listadoComentarios.forEach((item,index)=>{
      this.listadoComentarios.push(item);
    });
    
    setTimeout(()=>{
      this.modalcomentario.nativeElement.scrollTop=this.modalcomentario.nativeElement.scrollHeight;
    },1000)
    
  }

  sendComentario(){
    
    if(this.comentario===""){
      alert("ingrese un comentario");
      return;
    } else if(this.comentario.length<10){
      alert("Comentario muy corto");
      return;
    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Publicación Existosa',
      showConfirmButton: false,
      timer: 1500
    });
    this.loadComentarios(this.codeTask);
    this.comentario="";
  }

  editDeleteComentario(code:number){
    
    if(code>0){
      Swal.fire({
        title: '¿Que deseas realizar?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Editar',
        confirmButtonColor: '#0d6efd',
        denyButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.comentario="sdsa";
        } else if (result.isDenied) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Eliminado Correctamente',
            showConfirmButton: false,
            timer: 1500
          });
          this.loadComentarios(this.codeTask);
        }
      });
    }

  }
  

  ngOnInit(): void {
  }

}
