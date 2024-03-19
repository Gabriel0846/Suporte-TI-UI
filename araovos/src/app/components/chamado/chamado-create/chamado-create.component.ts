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

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  prioridade: string | undefined;
  status: string | undefined;

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

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

  // Mapeamento de nomes para valores numéricos
  statusOptions: any[] = [
    { label: 'ABERTO', value: 0 },
    { label: 'EM ANDAMENTO', value: 1 },
    { label: 'ENCERRADO', value: 2 }
  ];

  prioridadeOptions: any[] = [
    { label: 'BAIXA', value: 0 },
    { label: 'MEDIA', value: 1 },
    { label: 'ALTA', value: 2 }
  ];


  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.findAllClientes();
    this.findAllTecnicos();
  }

  create(): void {
    if (!this.validaCampos()) {
      return;
    }
    this.chamado.cliente = this.chamado.cliente.id;
    this.chamado.tecnico = this.chamado.tecnico.id;
  
    this.chamadoService.create(this.chamado).subscribe(
      resposta => {
        this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
        this.router.navigate(['chamados']);
      },
      ex => {
        console.log(ex);
        this.toastService.error(ex.error.error);
      }
    );
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
