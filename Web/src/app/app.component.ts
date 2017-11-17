import { Component, OnInit } from '@angular/core';
import { PetService, Cats } from './services/pet.service';
import { ToastOptions, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cats: Array<Cats>;
  loading: boolean = false;
  constructor(private petService: PetService, private toastyService: ToastyService) { }

  ngOnInit(): void {
    this.loading = true;
    this.petService.getCatsByOwnerGender()
      .subscribe((x: Array<Cats>) => {
        this.cats = x;
        console.log(x);
        this.loading = false;
      }, error => {
        this.loading = false;

        var toastOptions: ToastOptions = {
          title: 'Error',
          msg: 'Sorry cannot find any cats at the moment.',
          showClose: true,
          timeout: 5000,
          theme: 'material'
        };

        this.toastyService.error(toastOptions);
      });
  }
}
