import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../modelos/tecnico';

@Component({
  selector: 'app-tecnicos-list',
  templateUrl: './tecnicos-list.component.html',
  styleUrl: './tecnicos-list.component.css'
})
export class TecnicosListComponent implements OnInit{

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', "acoes"];
  ELEMENT_DATA: Tecnico [] = [
    {
      id: 1,
      nome: 'Gabriel Lopes',
      cpf: '123.456.789-10',
      email: 'gabriel@mail.com',
      senha: '1234',
      perfis: ['0'],
      dataCriacao: '12/03/2023'
    }
  ]

  ngOnInit(): void {

  }
}

