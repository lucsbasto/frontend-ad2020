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
          title: 'Sucess',
          text: 'All friends were raffled and sent by email',
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
      (error) => {
        Swal.fire({
          title: 'Error',
          text: `${error.message}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }

  delete(id) {
    this.amigoService.delete(id).subscribe(
      (res) => {
        Swal.fire({
          title: 'Sucess',
          text: 'User successfully deleted!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.users = this.users.filter((friend) => friend._id !== id);
      },
      (erro) => console.log(erro)
    );
  }
}
