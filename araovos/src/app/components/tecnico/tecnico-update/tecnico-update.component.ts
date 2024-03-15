import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TecnicoService } from '../../../services/tecnico.service';
import { Tecnico } from '../../../modelos/tecnico';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrl: './tecnico-update.component.css'
})
export class TecnicoUpdateComponent {

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

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  CPF: FormControl = new FormControl(null, [Validators.required, this.validaCPF]);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
   }

   findById(): void {
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
    })
  }

  editar(): void {
    this.service.update(this.tecnico).subscribe(() => {
      this.toast.success('Técnico atualizado com sucesso', 'Atualizado');
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
}
