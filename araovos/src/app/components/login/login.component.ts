import { Component, OnInit } from '@angular/core';
import { Credenciais } from '../modelos/credenciais';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  passwordVisible: boolean = false;

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService) {}

  ngOnInit(): void {

  }

  logar() {
    this.toast.error('Usuario e/ou senha incorretos!' , 'login')
    this.creds.senha = '';
  }

  validarCampos(): boolean {
    if(this.email.valid && this.senha.valid) {
      return true;
    } else {
      return false;
    }
  }
}
