import { Component, OnInit } from '@angular/core';
import { Chamado } from '../../../modelos/chamado';
import { FormControl, Validators } from '@angular/forms';
import { Cliente } from '../../../modelos/cliente';
import { Tecnico } from '../../../modelos/tecnico';
import { ChamadoService } from '../../../services/chamado.service';
import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css'] // Corrigir o nome da propriedade 'styleUrls'
})
export class ChamadoUpdateComponent implements OnInit {

  chamado: Chamado = {
    prioridade: '',
    status: '',
    titulo: '',
    observacoes: '',
    tecnico: '',
    cliente: '',
    nomeCliente: '',
    nomeTecnico: '',
  };

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
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const chamadoId = this.route.snapshot.paramMap.get('id');
    this.findById(chamadoId);
    this.findAllClientes();
    this.findAllTecnicos();
  }

  findById(id: string | null): void {
    if (!id) return;
    this.chamadoService.findById(id).subscribe(
      (resposta: Chamado) => {
        this.chamado = resposta;
        // Defina os valores iniciais dos dropdowns com base nos valores do chamado
        this.prioridadeControl.setValue(this.chamado.prioridade);
        this.statusControl.setValue(this.chamado.status);
        this.tecnicoControl.setValue(this.chamado.tecnico);
        this.clienteControl.setValue(this.chamado.cliente);
      },
      (error) => {
        this.toastService.error(error.error.error);
      }
    );
  }

  update(): void {
    if (!this.validaCampos()) {
      return;
    }
    this.chamadoService.update(this.chamado).subscribe(
      (resposta) => {
        this.toastService.success('Chamado atualizado com sucesso', 'Editar chamado');
        this.router.navigate(['chamados']);
      },
      (error) => {
        console.log(error);
        this.toastService.error(error.error.error);
      }
    );
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(
      (resposta) => {
        this.clientes = resposta as Cliente[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(
      (resposta) => {
        this.tecnicos = resposta as Tecnico[];
      },
      (error) => {
        console.log(error);
      }
    );
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
