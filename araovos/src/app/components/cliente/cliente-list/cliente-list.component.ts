import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../modelos/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  ELEMENT_DATA: Cliente[] = [];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
    });
  }
}
