import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../modelos/tecnico';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [ '1', '2'],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  CPF: FormControl = new FormControl(null, [Validators.required, this.validaCPF]);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  create(): void {
    this.service.create(this.tecnico).subscribe(() => {
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
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
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
