import { Observable } from 'rxjs';
import { Cats } from './pet.service';

export const cats: Array<Cats> = [];

export class PetServiceMock {
  private petEndpoint: string;
  getCatsByOwnerGender(): Observable<Array<Cats>> {
    return Observable.of(cats);
  }
}
