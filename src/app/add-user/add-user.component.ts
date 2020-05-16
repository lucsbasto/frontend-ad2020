import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AmigoSecretoService } from '../core/http/amigo-secreto.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.styl'],
})
export class AddUserComponent implements OnInit {
  formAdd: FormGroup;

  constructor(
    private fb: FormBuilder,
    private amigoService: AmigoSecretoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formAdd = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
    });
  }

  add() {
    this.amigoService.add(this.formAdd.value).subscribe(
      (res) => {
        Swal.fire({
          title: 'Sucess',
          text: 'User added successfully',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/']);
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: `${error.error.error}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    );
  }
}
