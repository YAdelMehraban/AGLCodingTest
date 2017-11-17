import { TestBed, async, inject } from '@angular/core/testing';
import { ToastyModule } from 'ng2-toasty';
import { AppComponent } from './app.component';
import { PetService } from './services/pet.service';
import { PetServiceMock } from './services/pet.service.mock';
import { Observable } from 'rxjs';

const petServiceMock: PetServiceMock = new PetServiceMock();

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ToastyModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: PetService, useValue: petServiceMock }
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should call service getcatsbyownergender action on load', async(inject([PetService], (petService: PetServiceMock) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    spyOn(petService, 'getCatsByOwnerGender').and.returnValue(Observable.of([]));

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(petService.getCatsByOwnerGender).toHaveBeenCalled();
    });
  })));

  it('should render the headers with two genders', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    spyOn(petServiceMock, 'getCatsByOwnerGender').and.returnValue(Observable.of([
      {
        gender: 'Male',
        petNames: ['Tom', 'Bob' ,'Rob']
      },
      {
        gender: 'Femail',
        petNames: ['Lili']
      }
    ]));

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('h3').length).toEqual(2);
  }));

  it('should render cat names', async(() => {
    const fixture = TestBed.createComponent(AppComponent);

    spyOn(petServiceMock, 'getCatsByOwnerGender').and.returnValue(Observable.of([
      {
        gender: 'Male',
        petNames: ['Tom', 'Bob', 'Rob']
      },
      {
        gender: 'Femail',
        petNames: ['Lili']
      }
    ]));

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('.title').length).toEqual(4);
  }));
});
