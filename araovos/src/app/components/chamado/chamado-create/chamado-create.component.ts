import { Component, OnInit } from '@angular/core';


interface Status {
  name: string;
  value: string;
}

interface Prioridade {
  name: string;
  value: string;
}

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrl: './chamado-create.component.css'
})
export class ChamadoCreateComponent implements OnInit{
  status: Status[] | undefined;
  prioridade: Prioridade[] | undefined;

    selectedStatus: Status | undefined;
    selectedPrioridade: Prioridade | undefined;

    ngOnInit() {
        this.status = [
            { name: 'ABERTO', value: '0' },
            { name: 'EM ANDAMENTO', value: '1' },
            { name: 'ENCERRADO', value: '3' }
        ];
        this.prioridade = [
          { name: 'BAIXA', value: '0' },
          { name: 'MEDIA', value: '1' },
          { name: 'ALTA', value: '3' }
      ];
    }
}
