import { Component, OnInit } from '@angular/core';
import { AmigoSecretoService } from '../core/http/amigo-secreto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.styl'],
})
export class ListUsersComponent implements OnInit {
  users: any;

  constructor(private amigoService: AmigoSecretoService) {}

  ngOnInit(): void {
    this.index();
  }

  raffle() {
    this.amigoService.raffle().subscribe(
      (res) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Todos os amigos foram sorteados e enviados por email',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      },
      (erro) => console.log(erro)
    );
  }
  index() {
    this.amigoService.index().subscribe(
      (res: any) => {
        this.users = res.users;
      },
      (error) => console.log(error)
    );
  }

  delete(id) {
    this.amigoService.delete(id).subscribe(
      (res) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Usuário deletado com sucesso !',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.users = this.users.filter((friend) => friend._id !== id);
      },
      (erro) => console.log(erro)
    );
  }
}
