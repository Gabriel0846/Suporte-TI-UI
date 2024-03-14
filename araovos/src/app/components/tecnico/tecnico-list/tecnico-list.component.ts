import { Component, OnInit } from '@angular/core';
import { Tecnico } from '../../../modelos/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnicos-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

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
