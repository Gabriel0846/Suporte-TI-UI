import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../../modelos/cliente';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  ELEMENT_DATA: Cliente[] = [];
  filteredData: Cliente[];

  constructor(private service: ClienteService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.filteredData = resposta;
    });
  }

  applyFilter(value: string) {
    value = value.trim().toLowerCase();
    this.filteredData = this.ELEMENT_DATA.filter(cliente =>
      cliente.nome.toLowerCase().includes(value) ||
      cliente.cpf.toLowerCase().includes(value) ||
      cliente.email.toLowerCase().includes(value)
    );
  }
}
