import { Component, OnInit } from '@angular/core';
import { Chamado } from '../../../modelos/chamado';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from '../../../modelos/cliente';
import { Tecnico } from '../../../modelos/tecnico';

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
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade:  null,
    status:      null,
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  status: Status[] = [];
  prioridade: Prioridade[] = [];

  selectedStatus: Status | undefined;
  selectedPrioridade: Prioridade | undefined;

  // Adicione as propriedades ao componente
  prioridadeValid: boolean = false;
  statusValid: boolean = false;
  tituloValid: boolean = false;
  observacoesValid: boolean = false;
  tecnicoValid: boolean = false;
  clienteValid: boolean = false;

  prioridadeControl: FormControl = new FormControl(null, [Validators.required]);
  statusControl: FormControl = new FormControl(null, [Validators.required]);
  tituloControl: FormControl = new FormControl(null, [Validators.required]);
  observacoesControl: FormControl = new FormControl(null, [Validators.required]);
  tecnicoControl: FormControl = new FormControl(null, [Validators.required]);
  clienteControl: FormControl = new FormControl(null, [Validators.required]);

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

  validaCampos(): boolean {
    // Verifica a validade dos campos individualmente
    this.prioridadeValid = this.prioridadeControl.valid;
    this.statusValid = this.statusControl.valid;
    this.tituloValid = this.tituloControl.valid;
    this.observacoesValid = this.observacoesControl.valid;
    this.tecnicoValid = this.tecnicoControl.valid;
    this.clienteValid = this.clienteControl.valid;

    // Retorna true apenas se todos os campos forem válidos
    return this.prioridadeValid && this.statusValid && this.tituloValid 
       && this.observacoesValid && this.tecnicoValid && this.clienteValid;
  }
}
