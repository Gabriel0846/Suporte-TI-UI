import { Component, OnInit } from '@angular/core';
import { Chamado } from '../../../modelos/chamado';
import { ChamadoService } from '../../../services/chamado.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrl: './chamado-read.component.css'
})
export class ChamadoReadComponent {
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
    private toastService: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }
}
