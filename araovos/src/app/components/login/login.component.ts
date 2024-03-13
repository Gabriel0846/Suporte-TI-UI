import { Component, OnInit } from '@angular/core';
import { Credenciais } from '../../modelos/credenciais';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
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
    this.service.authenticate(this.creds).subscribe({
      next: (resposta) => {
        this.service.successfulLogin(resposta.headers.get('Authorization').substring(7))
      },
      error: () => {
        this.toast.error('Usuário e/ou senha inválidos');
      }
    });
  }
  

  validarCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
}
