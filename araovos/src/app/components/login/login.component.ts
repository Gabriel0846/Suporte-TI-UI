import { Component, OnInit } from '@angular/core';
import { Credenciais } from '../../modelos/credenciais';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordVisible: boolean = false;

  creds: Credenciais = {
    email: '',
    senha: ''
  }

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService) {}

  ngOnInit(): void {}

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      console.log('Resposta do servidor:', resposta); // Verifica a resposta completa do servidor

      // Exibe a token de autenticação na notificação, se estiver presente na resposta
      const token = resposta.headers.get('Authorization');
      if (token) {
        this.toast.info(token);
      } else {
        this.toast.error('Token de autenticação não encontrado na resposta do servidor.');
      }
    });
  }

  validarCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
