import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../config/api.config';
import { Observable, map } from 'rxjs';
import { Tecnico } from '../modelos/tecnico';

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Tecnico> {
    return this.http.get<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`).pipe(
      map((tecnico: Tecnico) => {
        // Mapeando perfis de strings para números inteiros
        tecnico.perfis = tecnico.perfis.map(perfil => {
          if (perfil === 'CLIENTE') {
            return '1';
          } else if (perfil === 'ADMIN') {
            return '0';
          } else if (perfil === 'TECNICO') {
            return '2';
          }
          return perfil; // Caso não haja mapeamento para um perfil específico
        });
        return tecnico;
      })
    );
  }

  findAll(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(`${API_CONFIG.baseUrl}/tecnicos`);
  }

  create(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.post<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos`, tecnico);
  }

  update(tecnico: Tecnico): Observable<Tecnico> {
    return this.http.put<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${tecnico.id}`, tecnico);
  }

  deletar(id: any): Observable<Tecnico> {
    return this.http.delete<Tecnico>(`${API_CONFIG.baseUrl}/tecnicos/${id}`);
  }
}
