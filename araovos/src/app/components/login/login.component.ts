import { Component, OnInit } from '@angular/core';
import { Credenciais } from '../modelos/credenciais';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private messageService: MessageService) {}
  
  username: string;
  password: string;
  passwordVisible: boolean = false;

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  

  ngOnInit(): void {

  }

  logar() {
    console.log('Tentativa de login');
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
    console.log('depois da mensagem');
  }

  validarCampos(): boolean {
    console.log('Tentativa de validar');
    if(this.email.valid && this.senha.valid) {
      console.log('deu certo');     
      return true;
    } else {
      console.log('deu errado');
      return false;
    }
  }
}