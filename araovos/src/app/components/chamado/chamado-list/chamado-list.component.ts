import { Component } from '@angular/core';
import { Chamado } from '../../../modelos/chamado';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent {
po
  displayedColumns: string[] = ['id', 'titulo', 'nomeCliente', 'nomeTecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  ELEMENT_DATA: Chamado[] = [];

}
