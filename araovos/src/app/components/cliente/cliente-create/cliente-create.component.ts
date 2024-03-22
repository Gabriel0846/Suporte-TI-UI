import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../modelos/cliente';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [ '1'],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  CPF: FormControl = new FormControl(null, [Validators.required, this.validaCPF]);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.cliente).subscribe(() => {
      this.toast.success('Técnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos']);
    }, ex => {
      if (ex.error && ex.error.message) {
        const errorMessage = this.extractCPFErrorMessage(ex.error.message);
        if (errorMessage) {
          this.toast.error(errorMessage);
        } else {
          this.toast.error(ex.error.message);
        }
      } else {
        this.toast.error('Erro desconhecido ao cadastrar técnico');
      }
    })
  }

  addPerfil(perfil: any): void {
    if(this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
    
  }

  validaCampos(): boolean {
    return this.nome.valid && this.CPF.valid && this.email.valid && this.senha.valid;
  }
  
  validaCPF(control: FormControl): { [key: string]: any } | null {
    const cpf = control.value ? control.value.replace(/\D/g, '') : '';
    if (cpf.length !== 11) {
      return { 'cpfInvalido': true };
    }
    return null;
  }
  private extractCPFErrorMessage(errorMsg: string): string {
    const regex = /número do registro de contribuinte individual brasileiro \(CPF\) inválido/g;
    const matches = regex.exec(errorMsg);
    return matches ? matches[0] : null;
  }
}