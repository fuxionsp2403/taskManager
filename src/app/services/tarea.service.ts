import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Tarea } from '../interfaces/Tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  url_base = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getListarTareas(idProyecto:number):Observable<Tarea[]>{
    return this.http.get<Tarea[]>(this.url_base + 'api/projects/'+idProyecto+'/tasks')
    .pipe(
      catchError((e)=>{
        return throwError(e);
      })
    )
  }

  getListaTareaID(idProyecto:number,idTarea:number):Observable<any>{
    return this.http.get<any>(this.url_base + 'api/projects/'+idProyecto+'/tasks/'+idTarea)
    .pipe(
      catchError((e)=>{
        return throwError(e);
      })
    )
  }

  getCrearTareas(idProyecto:number,tarea:Tarea):Observable<Tarea>{
    return this.http.post<Tarea>(this.url_base + 'api/projects/'+idProyecto+'/tasks',tarea)
    .pipe(
      catchError((e)=>{
        return throwError(e);
      })
    )
  }

  putEditarTarea(idProyecto:number,idTarea:number,tarea:Tarea):Observable<Tarea>{
    return this.http.put<Tarea>(this.url_base + 'api/projects/'+idProyecto+'/tasks/'+idTarea,tarea)
    .pipe(
      catchError((e)=>{
        return throwError(e);
      })
    )
  }

  getEliminarTarea(idProyecto:number,idTarea:number):Observable<string>{
    return this.http.delete<string>(this.url_base + 'api/projects/'+idProyecto+'/tasks/'+idTarea)
    .pipe(
      catchError((e)=>{
        return throwError(e);
      })
    )
  }
}
