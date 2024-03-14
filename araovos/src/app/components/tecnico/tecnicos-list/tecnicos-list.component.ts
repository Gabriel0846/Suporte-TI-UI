import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../modelos/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnicos-list',
  templateUrl: './tecnicos-list.component.html',
  styleUrls: ['./tecnicos-list.component.css']
})
export class TecnicosListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  ELEMENT_DATA: Tecnico[] = [];

  constructor(private service: TecnicoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
    });
  }
}
