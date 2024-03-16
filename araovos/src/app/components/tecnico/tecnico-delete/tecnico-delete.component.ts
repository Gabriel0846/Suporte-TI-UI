import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../modelos/tecnico';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})
export class TecnicoDeleteComponent {
  CheckboxValue: boolean = true;

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: ['1', '2'],
    dataCriacao: ''
  }

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();

    $('#deletarButton').css({
      'background-color': 'red',
      'border-color': 'red',
      'color': 'white'
    });
   }

   findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
    })
  }

  deletar(): void {
    this.service.deletar(this.tecnico.id).subscribe(() => {
      this.toast.success('Técnico Deletado com sucesso', 'Deletado');
      this.router.navigate(['tecnicos'])
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }
  
  validaCPF(control: FormControl): { [key: string]: any } | null {
    const cpf = control.value ? control.value.replace(/\D/g, '') : '';
    if (cpf.length !== 11) {
      return { 'cpfInvalido': true };
    }
    return null;
  }
}
