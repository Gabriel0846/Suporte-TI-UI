import { Component, OnInit } from '@angular/core';
import { Chamado } from '../../../modelos/chamado';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from '../../../modelos/cliente';
import { Tecnico } from '../../../modelos/tecnico';
import { ChamadoService } from '../../../services/chamado.service';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

interface Status {
  name: string;
  value: number;
}

interface Prioridade {
  name: string;
  value: number;
}

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  selectedPrioridade: Prioridade | undefined;
  selectedStatus: Status | undefined; 

  chamado: Chamado = {
    prioridade: null,
    status: null,
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  status: Status[] = [];
  prioridade: Prioridade[] = [];

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

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.status = [
      { name: 'ABERTO', value: 0 },
      { name: 'EM ANDAMENTO', value: 1 },
      { name: 'ENCERRADO', value: 3 }
    ];

    this.prioridade = [
      { name: 'BAIXA', value: 0 },
      { name: 'MEDIA', value: 1 },
      { name: 'ALTA', value: 3 }
    ];

    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex);
      
      this.toastService.error(ex.error.error);
    })
  }
  
  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta as Cliente[];
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta as Tecnico[];
    });
  }
  
  validaCampos(): boolean {
    this.prioridadeValid = this.prioridadeControl.valid && this.chamado.prioridade !== null;
    this.statusValid = this.statusControl.valid && this.chamado.status !== null;
    this.tituloValid = this.tituloControl.valid && this.chamado.titulo.trim() !== '';
    this.observacoesValid = this.observacoesControl.valid && this.chamado.observacoes.trim() !== '';
    this.tecnicoValid = this.tecnicoControl.valid && this.chamado.tecnico !== null;
    this.clienteValid = this.clienteControl.valid && this.chamado.cliente !== null;

    return this.prioridadeValid && this.statusValid && this.tituloValid 
       && this.observacoesValid && this.tecnicoValid && this.clienteValid;
  }
}
