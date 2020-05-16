import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AmigoSecretoService } from '../core/http/amigo-secreto.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.styl'],
})
export class EditUserComponent implements OnInit {
  userId: string;
  formEdit: FormGroup;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private amigoService: AmigoSecretoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.userId = res.id;
      this.show(res.id);
    });
    this.formEdit = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
    });
  }

  show(id) {
    this.loading = false;
    this.amigoService.show(id).subscribe((res: any) => {
      this.formEdit.controls.name.setValue(res.user.name);
      this.formEdit.controls.email.setValue(res.user.email);
    });
  }

  update() {
    this.amigoService.update(this.userId, this.formEdit.value).subscribe(
      (res) => {
        Swal.fire({
          title: 'Sucesso',
          text: 'Usuário editado com sucesso',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigate(['/']);
      },
      (error) => console.log(error)
    );
  }
}
