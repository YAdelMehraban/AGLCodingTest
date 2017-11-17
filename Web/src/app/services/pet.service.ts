import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

export class Cats {
  gender: string;
  petNames: Array<string>;
}

@Injectable()
export class PetService {
  private petEndpoint: string = 'api/petowner/catsbyownergender';
  constructor(private http: Http) { }

  getCatsByOwnerGender(): Observable<Array<Cats>> {
    return this.http.get(this.petEndpoint)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
