import { Component, OnInit } from '@angular/core';
import { Chamado } from '../../../modelos/chamado';
import { ChamadoService } from '../../../services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'nomeCliente', 'nomeTecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  ELEMENT_DATA: Chamado[] = [];
  filteredData: Chamado[];

  constructor(private service: ChamadoService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.filteredData = resposta;
    });
  }

  retornaStatus(status: any): string {
    switch(status) {
      case '0':
        return 'ABERTO';
      case '1':
        return 'EM ANDAMENTO';
      default:
        return 'ENCERRADO';
    }
  }

  retornaPrioridade(prioridade: any): string {
    switch(prioridade) {
      case '0':
        return 'BAIXA';
      case '1':
        return 'MÉDIA';
      default:
        return 'ALTA';
    }
  }

  applyFilter(value: string): void {
    value = value.trim().toLowerCase();
    this.filteredData = this.ELEMENT_DATA.filter(chamado =>
      chamado.id.toString().toLowerCase().includes(value) ||
      chamado.titulo.toLowerCase().includes(value) ||
      chamado.nomeCliente.toLowerCase().includes(value) ||
      chamado.nomeTecnico.toLowerCase().includes(value) ||
      chamado.dataAbertura.toLowerCase().includes(value) ||
      this.retornaPrioridade(chamado.prioridade).toLowerCase().includes(value) ||
      this.retornaStatus(chamado.status).toLowerCase().includes(value)
    );
  }
}
