import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ToastyModule } from 'ng2-toasty';
import { AppComponent } from './app.component';
import { PetService } from './services/pet.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ToastyModule.forRoot()
  ],
  providers: [PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
