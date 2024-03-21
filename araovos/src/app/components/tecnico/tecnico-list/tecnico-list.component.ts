import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Tecnico } from '../../../modelos/tecnico';
import { TecnicoService } from '../../../services/tecnico.service';

@Component({
  selector: 'app-tecnicos-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  ELEMENT_DATA: Tecnico[] = [];
  filteredData: Tecnico[];
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(private service: TecnicoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.filteredData = resposta;
    });
  }

  applyFilter(value: string) {
    value = value.trim().toLowerCase();
    this.filteredData = this.ELEMENT_DATA.filter(tecnico =>
      tecnico.nome.toLowerCase().includes(value) ||
      tecnico.cpf.toLowerCase().includes(value) ||
      tecnico.email.toLowerCase().includes(value)
    );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.searchInput.nativeElement.focus();
  }
}
